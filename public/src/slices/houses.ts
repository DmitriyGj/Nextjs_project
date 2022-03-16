import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FetchStatus } from "../constants";
import { IHouse } from "../services";
import { RootState } from "../store/IceAndFireStore";
import { IHouseFullInfo } from "../ts";

export interface IHouseState {
    page: number,
    FetchStatus: FetchStatus
    houses: IHouse []
    currentHouse: IHouseFullInfo | null
};

const initialState: IHouseState = {
    page: 1,
    FetchStatus: FetchStatus.Needed,
    houses: [],
    currentHouse: null
};

export const housesSlice: Slice =  createSlice({
    name:'houses',
    initialState: initialState,
    reducers:{
        setFetchStatus(state, action : PayloadAction<FetchStatus>){
            state.FetchStatus = action.payload;
        },
        setHouses(state, action : PayloadAction<IHouse []> ){
            state.houses = action.payload;
        },
        setCurrentHouse(state, action : PayloadAction<IHouseFullInfo> ){
            state.currentHouse = action.payload;
        },
        incrementPage(state){
            state.page++;
        },
        clearHouses(state){
            state = initialState;
        }
    },
    extraReducers:{
    [HYDRATE]:(state, action: PayloadAction<RootState>) => {
            const {page, houses, currentHouse} = action.payload.houses;
            return {
                ...state, page, houses, currentHouse
            };
        }
    }
});

export const { setFetchStatus, setHouses, setCurrentHouse, incrementPage, clearHouses } = housesSlice.actions;
export default housesSlice.reducer;