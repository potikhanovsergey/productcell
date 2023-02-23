import { Group, Stack, StackProps, Text, useMantineTheme } from "@mantine/core";
import Arrow from "./Arrow";
import { daysArray } from "./CalendarGrid";

const ColumnLabels = (props: StackProps) => {
  const theme = useMantineTheme();
  return (
    <Stack
      spacing={4}
      sx={{
        zIndex: 10,
        position: "sticky",
        top: 0,
        background: theme.white,
        userSelect: "none",
      }}
      {...props}
    >
      <Group>
        <Text>Days</Text>
        <Arrow />
      </Group>
      <Group grow noWrap spacing={4} pos="relative">
        {daysArray.map((_, column) => (
          <Text align="center" key={column} size={10}>
            {column + 1}
          </Text>
        ))}
      </Group>
    </Stack>
  );
};

export default ColumnLabels;
