import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
          <meta name="msapplication-TileColor" content="#333333" />
          <meta name="theme-color" content="#ffffff" />
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

          {/* FACEBOOK */}
          <meta property="og:image:height" content="1190" />
          <meta property="og:image:width" content="2274" />
          <meta
            property="og:description"
            content="Click on a cell to see the product of the day with the highest upvotes. Click again to view its competitors. Filter the results by your favorite Product Hunt topics."
          />
          <meta
            property="og:title"
            content="See the best of Product Hunt through the life calendar"
          />
          <meta property="og:url" content="https://productcell.vercel.app" />
          <meta
            property="og:image"
            content="https://storycell.vercel.app/og-image.jpg"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
