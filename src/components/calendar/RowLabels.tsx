import { monthsArray, yearsArray } from "@/pages/_app";
import { mode } from "@/store/LegendStore";
import { observer, Show, useSelector } from "@legendapp/state/react";
import { rem, Stack, StackProps, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { ForwardedRef, forwardRef } from "react";

const RowLabels = (props: StackProps) => {
  const theme = useMantineTheme();
  return (
    <Stack
      sx={{
        pointerEvents: "none",
        userSelect: "none",
        position: "sticky",
        left: 0,
        background: theme.colorScheme === "dark" ? "#161920" : theme.white,
        zIndex: 10,
      }}
      spacing={0}
      justify="space-between"
      h="100%"
      {...props}
    >
      <Show if={mode.get() === "days"} else={yearsArray.map((_, row) => (
        <Text key={row} ta="right" w="100%" size={8}>
          {dayjs().subtract(row, "year").format("YYYY")}
        </Text>
      ))}>
        {monthsArray.map((_, row) => (
          <Text key={row} ta="right" w="100%" size={8}>
            {dayjs().subtract(row, "month").format("YYYY MMM")}
          </Text>
        ))}
      </Show>

    </Stack>
  );
};

RowLabels.displayName = "RowLabels";

export default observer(RowLabels);
