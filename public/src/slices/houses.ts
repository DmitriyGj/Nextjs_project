import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FetchStatus, offset } from "../constants";
import { HouseAPI, IHouse } from "../services";
import { RootState } from "../store/IceAndFireStore";
import { IHouseFullInfo } from "../ts";

export interface IHouseState {
    page: number,
    fetchStatus: FetchStatus
    houses: IHouse []
    currentHouse: IHouseFullInfo | null
};

const initialState: IHouseState = {
    page: 1,
    fetchStatus: FetchStatus.Needed,
    houses: [],
    currentHouse: null
};

export const fetchHouses = createAsyncThunk(
    'houses/fetchMassive',
    async (page:number) => {
        const response = await HouseAPI.getMassiveData(page,offset);
        return response;
    }
);

export const fetchHouse = createAsyncThunk(
    'houses/fetchFullData',
    async (id: string) => {
        const response = await  HouseAPI.getFullData(id);
        return response;
    }
);

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
        },
        [fetchHouses.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
        [fetchHouses.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
        [fetchHouses.fulfilled.type]:(state,action: PayloadAction<IHouse[]>) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            if(action.payload.length < offset){
                state.fetchStatus = FetchStatus.Ended;
            }
            state.houses = [...state.houses, ...action.payload];
        },

        [fetchHouses.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
        [fetchHouses.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
        [fetchHouses.fulfilled.type]:(state,action: PayloadAction<IHouseFullInfo>) => {
            state.currentHouse = action.payload;
        }
    }
});

export const { setFetchStatus, setHouses, setCurrentHouse, incrementPage, clearHouses } = housesSlice.actions;
export default housesSlice.reducer;