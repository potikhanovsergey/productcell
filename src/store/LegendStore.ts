import dayjs, { Dayjs } from "dayjs";
import { ProductHash, ProductHuntApiResponse, ProductsHash } from "./types";
import { computed, observable } from "@legendapp/state";

export const hoveredRow = observable(null as number | null);
export const hoveredRowCell = observable(null as number | null);
export const productsHash = observable({} as ProductHash);
export const loadingHash = observable([] as string[]);
export const minDate = dayjs().subtract(35, "month").endOf("month");
export const monthProductsHash = observable({} as ProductsHash);

export const filterBy = observable("all");

export const drawerDetails = observable({
  opened: false,
  products: null as ProductHuntApiResponse[] | null,
  date: null as Dayjs | null,
});

export const hoveredIndex = computed(() => {
  return `${hoveredRow.get()} ${hoveredRowCell.get()}`;
});

export const hoveredProduct = computed(() => {
  const produchHashValue = productsHash[filterBy.get()].get();
  return produchHashValue?.[hoveredIndex.get()]?.[0];
});

export const hoveredCellDate = computed(() => {
  const hoveredRowValue = hoveredRow.get();
  const hoveredRowCellValue = hoveredRowCell.get();
  if (hoveredRowValue === null || hoveredRowCellValue === null) return null;
  return dayjs()
    .startOf("month")
    .subtract(hoveredRowValue, "month")
    .add(hoveredRowCellValue, "day")
    .format("MMMM D YYYY, dddd");
});
