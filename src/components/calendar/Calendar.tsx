import { getProduct } from "@/queries/getProduct";
import { productsHash } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { Box, Container } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Dayjs } from "dayjs";
import CalendarGrid from "./CalendarGrid";
import ColumnLabels from "./ColumnLabels";
import DetailsDrawer from "./DetailsDrawer";
import RowLabels from "./RowLabels";

const timezone = "America/Vancouver";

export const fetchProductAndSet = async ({
  index,
  date,
}: {
  index: string;
  date: Dayjs;
}) => {
  const dateFrom = date
    .utc()
    .tz(timezone)
    .startOf("day")
    .add(1, "day")
    .toDate();
  const dateTo = date.utc().tz(timezone).startOf("day").add(2, "day").toDate();
  const { data } = await getProduct({
    dateFrom,
    dateTo,
  });
  if (data) {
    productsHash.set((prev) => ({
      ...prev,
      [index]: data.data.posts.nodes,
    }));
  }
};

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
      <DetailsDrawer />
    </Container>
  );
};

export default observer(Calendar);
