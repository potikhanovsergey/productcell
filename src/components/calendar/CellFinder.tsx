import { AppStore } from "@/store/AppStore";
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
  const findWinner = () => {
    if (date) {
      const indexes = getIdByDate({ date });
      const index = `${indexes.rowIndex} ${indexes.dayIndex}`;
      const cell = document.querySelector<HTMLAnchorElement>(
        `[data-index="${index}"]`
      );
      if (cell) {
        AppStore.setHoveredRow(indexes.rowIndex);
        AppStore.setHoveredRowCell(indexes.dayIndex);
        cell.scrollIntoView({ block: "center", behavior: "smooth" });
        AppStore.setCellToBeFound({ index, date });
      }
    }
  };

  return (
    <Group>
      <DateInput
        value={date}
        onChange={setDate}
        size="xs"
        minDate={AppStore.minDate.toDate()}
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
