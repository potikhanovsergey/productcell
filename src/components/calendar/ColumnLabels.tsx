import { daysArray, monthsArray, weeksArray } from "@/pages/_app";
import { mode } from "@/store/LegendStore";
import { observer, Show } from "@legendapp/state/react";
import { Group, Stack, StackProps, Text, useMantineTheme } from "@mantine/core";
import Arrow from "./Arrow";

const ColumnLabels = (props: StackProps) => {
  const theme = useMantineTheme();
  return (
    <Stack
      spacing={4}
      sx={{
        zIndex: 10,
        position: "sticky",
        top: 0,
        background: theme.colorScheme === "dark" ? "#161920" : theme.white,
        userSelect: "none",
      }}
      {...props}
    >
      <Group grow noWrap spacing={4} pos="relative">
        <Show if={mode.get() === "days"} else={weeksArray.map((_, column) => (
          <Text align="center" key={column} size={10}>
            {column + 1}
          </Text>
        ))}>
        {daysArray.map((_, column) => (
          <Text align="center" key={column} size={10}>
            {column + 1}
          </Text>
        ))}
        </Show>

      </Group>
    </Stack>
  );
};

export default observer(ColumnLabels);
