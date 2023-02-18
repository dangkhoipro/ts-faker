import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/globals.css";

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <>
      <Head>
        <title>Generate Fake Data</title>
        <meta name="description" content="Generate Fake Data" />
        <meta name="viewport" content="width=1024" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
