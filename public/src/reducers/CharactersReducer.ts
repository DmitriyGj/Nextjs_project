import { ICharactersState, IFetchParams } from "../ts/Slice.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IceAndFireService } from "../services/IceAndFireAPI/IceAndFireService";

const initialState: ICharactersState  = {
    fetchStatus:'needed',
    isLoad:false,
    characters:[],
    page:1,
    offset: 10,
    currentCharacter: undefined
};

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (params: IFetchParams) => {
        const response = await IceAndFireService.getCharacters(params.page,params.amount);
        return response;
    });

export const fetchCharacterInfo =  createAsyncThunk(
    'characters/fetCharacter',
    async (id: string) => {
        const response = await IceAndFireService.getCharacter(id);
        const data = await response;
        return data;
    }
)


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
            state.fetchStatus = 'pending'
        }),
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled'
            state.characters = [...state.characters, ...action.payload]
        }),
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.fetchStatus = 'rejected'
        }),
        builder.addCase(fetchCharacterInfo.pending, (state) => {
            state.fetchStatus = 'pending';
        }),
        builder.addCase(fetchCharacterInfo.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.characterInfo = action.payload;
        })
    }
});

export const {toggleIsLoad, incrementPage} =  charactersSlice.actions;
export default charactersSlice.reducer;