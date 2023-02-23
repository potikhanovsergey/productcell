import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import MantineTheme from "@/MantineTheme";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo-client";
import { Analytics } from "@vercel/analytics/react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={MantineTheme}>
          <Component {...pageProps} />
          <Analytics />
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}
