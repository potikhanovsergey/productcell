import { daysArray } from "@/pages/_app";
import { Box, Group, Stack, StackProps, Text, useMantineTheme } from "@mantine/core";
import Arrow from "./Arrow";

const ColumnLabels = (props: StackProps) => {
  const theme = useMantineTheme();
  return (
    <Group
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
      <Group sx={{ flex: "1 !important" }} grow noWrap spacing={4} pos="relative">
        {daysArray.map((_, column) => (
          <Text align="center" key={column} size={10}>
            {column + 1}
          </Text>
        ))}
      </Group>
      <Box w={24} />
    </Group>
  );
};

export default ColumnLabels;
