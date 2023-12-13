import { AppShell, Flex, Title, useMantineTheme } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
          position: "relative",
        },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Flex bg="blue" h={60} align="center">
          <Title c="white" style={{ flex: 1 }} ta="center" order={2}>
            Formsly Url Shortener
          </Title>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;
