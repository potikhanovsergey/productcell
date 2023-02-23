import { getProduct } from "@/queries/getProduct";
import { AppStore } from "@/store/AppStore";
import { Box, Container, Group } from "@mantine/core";
import { useDebouncedValue, useElementSize } from "@mantine/hooks";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";

const Calendar = () => {
  const { width, ref } = useElementSize();
  const [debouncedHoverCell] = useDebouncedValue(AppStore.hoveredRowCell, 1000);

  const fetchProductAndSet = async ({
    index,
    date,
  }: {
    index: string;
    date: Dayjs;
  }) => {
    const { data } = await getProduct({
      dateFrom: date.toDate(),
      dateTo: date.add(1, "day").toDate(),
    });
    if (data) {
      AppStore.productsHash[index] = data.data.posts.nodes[0];
    }
  };

  useEffect(() => {
    const fetchProductIfNeeded = async () => {
      if (
        debouncedHoverCell !== null &&
        AppStore.hoveredRow !== null &&
        AppStore.hoveredRowCell !== null
      ) {
        const index = `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`;
        if (!AppStore.productsHash[index]) {
          const date = dayjs()
            .startOf("month")
            .subtract(AppStore.hoveredRow, "month")
            .add(AppStore.hoveredRowCell, "day");
          fetchProductAndSet({ index, date });
        }
      }
    };
    fetchProductIfNeeded();
  }, [debouncedHoverCell]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (
        AppStore.cellToBeFound &&
        !AppStore.productsHash[AppStore.cellToBeFound.index]
      ) {
        const date = dayjs(AppStore.cellToBeFound.date).startOf("day");
        const index = `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`;
        fetchProductAndSet({ index, date });
      }
    };

    fetchProduct();
  }, [AppStore.cellToBeFound]);

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
