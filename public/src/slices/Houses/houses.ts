import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FetchStatus, offset, SlicesInitialStates } from "../../constants";
import { HouseAPI, IHouse } from "../../services";
import { RootState } from "../../store/IceAndFireStore";
import { IHouseFullInfo } from "../../ts";
import { IHouseState } from "./HousesSlice.model";

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
    initialState: SlicesInitialStates.houses,
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
            state = SlicesInitialStates.houses;
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
            if(!action.payload){
                return {...state, houses: [], fetchStatus: FetchStatus.Fulfilled};
            }
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
            if(!action.payload){
                return {...state, fetchStatus: FetchStatus.Rejected};
            }
            state.currentHouse = action.payload;
            state.fetchStatus = FetchStatus.Fulfilled;
        }
    }
});

export const { setFetchStatus, setHouses, setCurrentHouse, incrementPage, clearHouses } = housesSlice.actions;
export default housesSlice.reducer;