import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { HouseAPI } from "../services";
import { IFetchParams } from "../ts/IFetchParams.model";
import { IHouse } from "../services";
import { IHouseFullInfo } from "../ts";
import { IReducerState } from "../ts";
import { FetchStatus } from "../constants/FetchStatus";

const initialState: IReducerState<IHouse, IHouseFullInfo>  = {
    fetchStatus: FetchStatus.Needed,
    isLoad:false,
    items:[],
    page:1,
    offset: 10,
    currentItem: undefined
};

export const fetchHouses = createAsyncThunk(
    'houses/fetchHouses',
    async (params: IFetchParams) => {
        const response = await HouseAPI.getMassiveData(params.page,params.offset);
        return response;
    });

export const fetchHouseInfo =  createAsyncThunk(
    'houses/fetchHouse',
    async (id: string) => {
        const response = await HouseAPI.getFullData(id);
        return response;
    }
);


const housesSlice = createSlice({
    name:'houses',
    initialState,
    reducers:{
        toggleIsLoad(state){
            state.isLoad = !state.isLoad;
        },
        incrementPage(state){
            state.page++;
        },
        setFetchStatus(state,action){
            state.fetchStatus = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchHouses.pending, (state) => {
            state.fetchStatus = FetchStatus.Pending;
        }),
        builder.addCase(fetchHouses.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            state.items = [...state.items, ...action.payload];
        }),
        builder.addCase(fetchHouses.rejected, (state) => {
            state.fetchStatus = FetchStatus.Rejected;
        }),
        builder.addCase(fetchHouseInfo.pending, (state) => {
            state.fetchStatus = FetchStatus.Pending;
        }),
        builder.addCase(fetchHouseInfo.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            state.currentItem = action.payload;
        });
    }
});

export const {toggleIsLoad, incrementPage} =  housesSlice.actions;
export default housesSlice.reducer;