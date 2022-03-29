import { FetchStatus } from "../constants";
import { RootState } from "../store/IceAndFireStore";
import { CharactersFilterParams, HousesFilterParams } from "../ts/IFetchParams.model";

export const getHouses = (state: RootState) => state.houses.houses;
export const getCurrentHouse = (state: RootState) => state.houses.houses;
export const getPage = (state:RootState) => state.houses.page;
export const getFetchStatusHouses = (state: RootState) : FetchStatus => state.houses.fetchStatus;
export const getCurrentHousesFilter = (state: RootState) : HousesFilterParams => state.filters.houses;