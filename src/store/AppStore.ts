import { action, makeAutoObservable } from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /////////// COMPUTED /////////////
  /////////// ACTIONS //////////////
}

export const AppStore = new Store();
