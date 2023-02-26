import dayjs from "dayjs";
import { ProductHash } from "./types";
import { computed, observable } from "@legendapp/state";

const hoveredRow = observable(null as number | null);
const hoveredRowCell = observable(null as number | null);
const productsHash = observable({} as ProductHash);
const minDate = dayjs().subtract(35, "month").endOf("month");
const drawerOpened = observable(false);

const hoveredProduct = computed(() => {
  const hoveredRowValue = hoveredRow.get();
  const hoveredRowCellValue = hoveredRowCell.get();
  const index = `${hoveredRowValue} ${hoveredRowCellValue}`;
  const produchHashValue = productsHash.get();
  return produchHashValue[index];
});

const hoveredCellDate = computed(() => {
  const hoveredRowValue = hoveredRow.get();
  const hoveredRowCellValue = hoveredRowCell.get();
  if (hoveredRowValue === null || hoveredRowCellValue === null) return null;
  return dayjs()
    .startOf("month")
    .subtract(hoveredRowValue, "month")
    .add(hoveredRowCellValue, "day")
    .format("MMMM D, YYYY");
});

export {
  hoveredRow,
  hoveredRowCell,
  productsHash,
  hoveredCellDate,
  minDate,
  hoveredProduct,
  drawerOpened,
};
