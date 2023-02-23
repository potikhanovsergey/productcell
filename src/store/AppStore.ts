import dayjs from "dayjs";
import { action, computed, makeAutoObservable } from "mobx";
import { ProductHash } from "./types";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  hoveredCell: number | null = null;
  hoveredRow: number | null = null;
  hoveredRowCell: number | null = null;

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
}

export const AppStore = new Store();
