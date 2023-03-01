import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import MantineTheme from "@/MantineTheme";
import { Analytics } from "@vercel/analytics/react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { enableLegendStateReact } from "@legendapp/state/react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Los_Angeles");

enableLegendStateReact();

const months = 36;

export const monthsArray = Array(months).fill(null);
export const daysArray = Array(31).fill(null);

export const rows: number[][] = [];
for (let i = 0; i < months; i++) {
  let daysInMonth = dayjs().startOf("month").subtract(i, "month").daysInMonth();

  if (i === 0) {
    daysInMonth = dayjs().date() - 1;
  }
  const monthArray = Array.from(Array(daysInMonth).keys());
  rows.push(monthArray);
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={MantineTheme}>
        <Component {...pageProps} />
        <Analytics />
      </MantineProvider>
    </>
  );
}
