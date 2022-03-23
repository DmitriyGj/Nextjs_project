import { FetchStatus } from "../constants";
import { RootState } from "../store/IceAndFireStore";

export const getHouses = (state: RootState) => state.houses.houses;
export const getCurrentHouse = (state: RootState) => state.houses.houses;
export const getPage = (state:RootState) => state.houses.page;
export const getFetchStatusHouses = (state: RootState) : FetchStatus => state.houses.fetchStatus;