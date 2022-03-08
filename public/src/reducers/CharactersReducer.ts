import { IFetchParams, IReducerState } from "../ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../constants/FetchStatus";
import { CharacterAPI } from "../services/CharacterAPI/CharacterAPI";
import { ICharacter } from "../services";
import { ICharacterFullInfo } from "../ts";

const initialState: IReducerState<ICharacter,ICharacterFullInfo>  = {
    fetchStatus: FetchStatus.Needed,
    isLoad:false,
    items:[],
    page:1,
    offset: 10,
    currentItem: undefined
};

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (params: IFetchParams) => {
        const response = await CharacterAPI.getMassiveData(params.page,params.offset);
        return response;
    });

export const fetchCharacterInfo =  createAsyncThunk(
    'characters/fetCharacter',
    async (id: string) => {
        const response = await CharacterAPI.getFullData(id);
        return response;
    }
);

const charactersSlice = createSlice({
    name:'characters',
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
        builder.addCase(fetchCharacters.pending, (state) => {
            state.fetchStatus = FetchStatus.Pending;
        }),
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            state.items = [...state.items, ...action.payload];
        }),
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.fetchStatus = FetchStatus.Rejected;
        }),
        builder.addCase(fetchCharacterInfo.pending, (state) => {
            state.fetchStatus = FetchStatus.Pending;
        }),
        builder.addCase(fetchCharacterInfo.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            state.currentItem = action.payload;
        });
    }
});

export const {toggleIsLoad, incrementPage} =  charactersSlice.actions;
export default charactersSlice.reducer;