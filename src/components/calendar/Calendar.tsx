import { Box, Container, Group } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import CalendarGrid from "./CalendarGrid";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";

const Calendar = () => {
  const { width, ref } = useElementSize();
  return (
    <Container size="md">
      <ColumnLabels mb={4} pl={width} />
      <Box
        pos="relative"
        sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}
      >
        <RowLabels ref={ref} />
        <CalendarGrid sx={{ flex: 1 }} />
      </Box>
    </Container>
  );
};

export default Calendar;
