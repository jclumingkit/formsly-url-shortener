import Head from "next/head";
import MainPage from "./components/MainPage";

const Page = () => {
  return (
    <>
      <Head>
        <title>Formsly Url Shortener</title>
        <meta name="description" content="Formsly url shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPage />
    </>
  );
};

export default Page;
