import { Box, rem, Stack, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { ForwardedRef, forwardRef, useEffect } from "react";
import { monthsArray } from "./CalendarGrid";

const RowLabels = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  const theme = useMantineTheme();
  return (
    <Stack
      ref={ref}
      sx={{
        pointerEvents: "none",
        userSelect: "none",
      }}
      spacing={0}
      justify="space-between"
      h="100%"
    >
      {monthsArray.map((_, row) => (
        <Text
          key={row}
          ta="right"
          w="100%"
          size={10}
          sx={{
            [`@media (max-width: ${theme.breakpoints.md})`]: {
              fontSize: rem(8),
            },
            [`@media (max-width: ${theme.breakpoints.xs})`]: {
              fontSize: rem(4),
            },
          }}
        >
          {dayjs().subtract(row, "month").format("YYYY MMM")}
        </Text>
      ))}
    </Stack>
  );
});

RowLabels.displayName = "RowLabels";

export default RowLabels;
