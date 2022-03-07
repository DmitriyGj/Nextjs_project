import { RootState } from "../store/IceAndFireStore";

export const getHouses = (state: RootState) => {
    const {houses: housesInfo} = state; 
    return housesInfo.items;
}

export const getHousesStoreInfo = (state: RootState) => {
    const {page, fetchStatus, offset } = state.houses
    return {page, fetchStatus,offset};
}

export const getHouseFullInfo = (state: RootState) => {
    const {currentItem: currentCharacter} = state.houses
    return currentCharacter;
}