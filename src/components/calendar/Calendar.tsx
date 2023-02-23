import { AppStore } from "@/store/AppStore";
import { Box, Container, Group } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { observer } from "mobx-react-lite";
import CalendarGrid from "./CalendarGrid";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";

const Calendar = () => {
  const { width, ref } = useElementSize();
  return (
    <Container size="md">
      <ColumnLabels mb={4} pl={width ? width + 8 : undefined} />
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

export default observer(Calendar);
