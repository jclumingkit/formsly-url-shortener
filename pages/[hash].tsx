import { checkIfHashExists, getShortLink } from "@/backend/get";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(ctx);
  const hash = ctx.query.hash as string;
  const hashIsExisting = await checkIfHashExists(supabaseClient, { hash });

  if (hashIsExisting) {
    const shortLinkData = await getShortLink(supabaseClient, hash);

    return {
      redirect: {
        destination: shortLinkData.short_url_original_url,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const HashPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Formsly URL Shortener</title>
        <meta name="description" content="Formsly URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Requested link not found</h1>
    </div>
  );
};

export default HashPage;
