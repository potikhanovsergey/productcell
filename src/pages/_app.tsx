import { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import MantineTheme from "@/MantineTheme";
import { Analytics } from "@vercel/analytics/react";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { enableLegendStateReact } from "@legendapp/state/react";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Los_Angeles");

enableLegendStateReact();

export const months = 36;
export const years = 6;


export const monthsArray = Array(months).fill(null);
export const daysArray = Array(31).fill(null);


export const currentYearWeeksArray = Object.keys(Array(dayjs().week()).fill(null)).map(Number)
export const weeksArray = Object.keys(Array(52).fill(null)).map(Number)

export const yearsArray = Object.keys(Array(years).fill(null)).map(y => weeksArray)

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
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ ...MantineTheme, colorScheme }}
        >
          <Component {...pageProps} />

          <Analytics />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
