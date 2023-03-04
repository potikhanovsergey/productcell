import { AppShell } from "@mantine/core";
import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>See the best of Product Hunt through the life calendar</title>
      </Head>
      <AppShell
        header={<Header />}
        footer={<Footer />}
        styles={{ main: { paddingLeft: 0, paddingRight: 0 } }}
        fixed={false}
      >
        {children}
      </AppShell>
    </>
  );
};

export default Layout;
