import { filterBy, minDate, productsHash } from "@/store/LegendStore";
import { ActionIcon, Group } from "@mantine/core";
import { DateInputProps, DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { fetchProductAndSet } from "@/queries/getProduct";
import { observer } from "@legendapp/state/react";

export const getIdByDate = ({ date }: { date: Date | Dayjs }) => {
  const rowIndex = dayjs()
    .startOf("month")
    .diff(dayjs(date).startOf("month"), "month");
  const dayIndex = dayjs(date).date() - 1;

  return { dayIndex, rowIndex };
};

const CellFinder = (props: DateInputProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const fetchProduct = async ({
    index,
    date,
  }: {
    index: string;
    date: Date;
  }) => {
    if (!productsHash[filterBy.get()].get()[index]) {
      fetchProductAndSet({ index, date: dayjs(date) });
    }
  };

  const findCell = () => {
    if (date) {
      const indexes = getIdByDate({ date });
      const index = `${indexes.rowIndex} ${indexes.dayIndex}`;
      const cell = document.querySelector<HTMLAnchorElement>(
        `[data-index="${index}"]`
      );
      if (cell) {
        cell.scrollIntoView({ block: "center", behavior: "smooth" });
        fetchProduct({ index, date });
      }
    }
  };

  return (
    <Group spacing="xs">
      <DateInput
        value={date}
        onChange={setDate}
        size="xs"
        minDate={minDate.toDate()}
        maxDate={dayjs().subtract(1, "day").toDate()}
        placeholder="Enter date"
      />
      <ActionIcon
        variant="filled"
        disabled={!date}
        color="orange"
        aria-label="Search the products by date"
        size={30}
        onClick={findCell}
      >
        <IconSearch size="66%" />
      </ActionIcon>
    </Group>
  );
};

export default observer(CellFinder);
