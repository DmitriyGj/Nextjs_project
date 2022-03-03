import { ICharactersState, IFetchParams } from "../ts/Slice.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CharacterAPI } from "../services/CharacterAPI/CharacterAPI";

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
        const response = await CharacterAPI.getMassiveData(params.page,params.offset);
        return response;
    });

export const fetchCharacterInfo =  createAsyncThunk(
    'characters/fetCharacter',
    async (id: string) => {
        const response = await CharacterAPI.getFullData(id);
        return response;
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
            state.currentCharacter = action.payload;
        })
    }
});

export const {toggleIsLoad, incrementPage} =  charactersSlice.actions;
export default charactersSlice.reducer;