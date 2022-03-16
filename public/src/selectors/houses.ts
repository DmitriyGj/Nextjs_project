import { RootState } from "../store/IceAndFireStore";

export const getHouses = (state: RootState) => state.houses.houses;
export const getCurrentHouse = (state: RootState) => state.houses.houses;
export const getPage = (state:RootState) => state.houses.page;
