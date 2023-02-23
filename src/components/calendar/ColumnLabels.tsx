import {
  Box,
  Group,
  rem,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Arrow from "./Arrow";
import { daysArray } from "./CalendarGrid";

const ColumnLabels = (props: StackProps) => {
  return (
    <Stack spacing={4} {...props}>
      <Group position="apart">
        <Text>Days</Text>
        <Arrow sx={{ transform: "rotate(180deg)" }} />
      </Group>
      <Group grow noWrap spacing={4} pos="relative">
        {daysArray.map((_, column) => (
          <Text align="center" key={column} size={10}>
            {daysArray.length - column}
          </Text>
        ))}
      </Group>
    </Stack>
  );
};

export default ColumnLabels;
