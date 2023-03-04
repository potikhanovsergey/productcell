import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/productcell.svg" />
          <meta
            name="title"
            content="See the best of Product Hunt through the life calendar"
          />
          <meta
            name="description"
            content="See the best of Product Hunt through a life calendar. Click on a cell to see the best products of the day. Filter the results by your favorite topics."
          />
          <meta
            name="keywords"
            content="Product Hunt, Life calendar, Calendar"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
