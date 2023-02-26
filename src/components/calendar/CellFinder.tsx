import { getProduct } from "@/queries/getProduct";
import {
  hoveredRow,
  hoveredRowCell,
  minDate,
  productsHash,
} from "@/store/LegendStore";
import { Group } from "@mantine/core";
import { DateInputProps, DateInput } from "@mantine/dates";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";

export const getIdByDate = ({ date }: { date: Date | Dayjs }) => {
  const rowIndex = dayjs().startOf("month").diff(date, "month");
  const dayIndex = dayjs(date).date() - 1;

  return { dayIndex, rowIndex };
};

const CellFinder = (props: DateInputProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const fetchProductAndSet = async ({
    index,
    date,
  }: {
    index: string;
    date: Dayjs;
  }) => {
    const { data } = await getProduct({
      dateFrom: date.utc().startOf("day").toDate(),
      dateTo: date.utc().startOf("day").add(1, "day").toDate(),
    });
    if (data) {
      productsHash.set((prev) => ({
        ...prev,
        [index]: data.data.posts.nodes[0],
      }));
    }
  };
  const fetchProduct = async ({
    index,
    date,
  }: {
    index: string;
    date: Date;
  }) => {
    if (!productsHash.get()[index]) {
      fetchProductAndSet({ index, date: dayjs(date) });
    }
  };

  const findWinner = () => {
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
    <Group>
      <DateInput
        value={date}
        onChange={setDate}
        size="xs"
        minDate={minDate.toDate()}
        maxDate={dayjs().subtract(1, "day").toDate()}
        placeholder="Launch date"
      />
      <PrimaryButton disabled={!date} size="xs" onClick={findWinner}>
        Find winner
      </PrimaryButton>
    </Group>
  );
};

export default CellFinder;
