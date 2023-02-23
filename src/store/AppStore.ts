import dayjs, { Dayjs } from "dayjs";
import { action, computed, makeAutoObservable } from "mobx";
import { ProductHash } from "./types";

type CellToBeFound = { index: string; date: Date | Dayjs } | null;

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  minDate = dayjs().subtract(35, "month").endOf("month");

  hoveredCell: number | null = null;
  hoveredRow: number | null = null;
  hoveredRowCell: number | null = null;

  cellToBeFound: CellToBeFound = null;

  productsHash: ProductHash = {};

  /////////// COMPUTED /////////////
  @computed
  get hoveredCellDate() {
    if (this.hoveredRow === null || this.hoveredRowCell === null) return null;
    return dayjs()
      .startOf("month")
      .subtract(this.hoveredRow, "month")
      .add(this.hoveredRowCell, "day")
      .format("MMMM D, YYYY");
  }
  /////////// ACTIONS //////////////
  @action
  setHoveredCell = (value: number | null) => {
    this.hoveredCell = value;
  };
  @action
  setHoveredRow = (value: number | null) => {
    this.hoveredRow = value;
  };
  @action
  setHoveredRowCell = (value: number | null) => {
    this.hoveredRowCell = value;
  };
  @action
  setCellToBeFound = (value: CellToBeFound) => {
    this.cellToBeFound = value;
  };
}

export const AppStore = new Store();
