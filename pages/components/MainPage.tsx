import { checkIfHashExists } from "@/backend/get";
import { createShortLink } from "@/backend/post";
import { Database } from "@/utils/database";
import {
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { IconCopy } from "@tabler/icons-react";
import { customAlphabet } from "nanoid";
import { useState } from "react";
import validator from "validator";

const MainPage = () => {
  const supabaseClient = createPagesBrowserClient<Database>();

  const [longLink, setLongLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";

  const getHash = async () => {
    try {
      const maxAttempts = 10;
      let attempt = 0;
      let hashIsExisting = true;
      let hash;

      while (hashIsExisting && attempt < maxAttempts) {
        hash = customAlphabet(characters, 6)();
        hashIsExisting = await checkIfHashExists(supabaseClient, {
          hash: `${hash}`,
        });
        attempt++;
      }

      if (hashIsExisting) {
        throw new Error(
          "Unable to generate a unique hash after multiple attempts.",
        );
      }

      return hash;
    } catch (error) {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        message: "Unable to generate a unique hash after multiple attempts.",
        color: "orange",
      });
    }
  };

  const handleCreateShortLink = async () => {
    try {
      setIsLoading(true);
      if (!validator.isURL(longLink) || longLink === "") {
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          title: "Invalid link.",
          message: "Please input a valid link.",
          color: "orange",
        });
        return;
      }

      const hash = await getHash();

      const newShortLink = await createShortLink(supabaseClient, {
        url: longLink,
        hash: `${hash}`,
      });

      if (newShortLink) {
        setShortLink(newShortLink.short_url_short_url);
      }
    } catch (error) {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Something went wrong.",
        message: "Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Paper mt={64} mx="auto" p="md" pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Title order={3}>Shorten a long link</Title>
          <Flex mt="sm" gap="md">
            <TextInput
              w="100%"
              size="lg"
              value={longLink}
              onChange={(e) => setLongLink(e.currentTarget.value)}
              placeholder="Example: https://super-long-link.com/shorten-it"
            />
            <Button w={240} size="lg" onClick={handleCreateShortLink}>
              Shorten Link
            </Button>
          </Flex>

          {shortLink && (
            <Box mt="md">
              <Card bg="green.1" withBorder>
                <Group justify="apart">
                  <Text fw={600}>{shortLink}</Text>
                  <CopyButton value={shortLink}>
                    {({ copied, copy }) => (
                      <Button
                        leftSection={<IconCopy size={14} />}
                        color={copied ? "teal" : "blue"}
                        onClick={copy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </Group>
              </Card>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default MainPage;
