import dayjs from "dayjs";

export const getDateByIndexes = ({
  rowIndex,
  cellIndex,
}: {
  rowIndex: number;
  cellIndex: number;
}) => {
  return dayjs()
    .startOf("month")
    .subtract(rowIndex, "month")
    .add(cellIndex, "day");
};
