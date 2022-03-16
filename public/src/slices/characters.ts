import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FetchStatus, initPage, offset } from "../constants";
import { CharacterAPI, ICharacter } from "../services";
import { RootState } from "../store/IceAndFireStore";
import {  ICharacterFullInfo } from "../ts";

export interface ICharacterState {
    page: number,
    fetchStatus: FetchStatus
    characters: ICharacter[]
    currentCharacter: ICharacterFullInfo | null
};

const initialState: ICharacterState = {
    page: initPage,
    fetchStatus: FetchStatus.Needed,
    characters: [],
    currentCharacter: null
};

export const fetchCharacters = createAsyncThunk(
    'characters/fetchMassive',
    async (page:number) => {
        const response = await CharacterAPI.getMassiveData(page,offset);
        return response;
    }
);

export const fetchCharacter = createAsyncThunk(
    'characters/fetchFullData',
    async (id: string) => {
        const response = await CharacterAPI.getFullData(id);
        return response;
    }
);

export const charactersSlice: Slice =  createSlice({
    name:'charcters',
    initialState: initialState,
    reducers:{
        setFetchStatus(state, action : PayloadAction<FetchStatus>){
            state.FetchStatus = action.payload;
        },
        setCharacters(state, action : PayloadAction<ICharacter []> ){
            state.characters = action.payload;
        },
        setCurrentCharacter(state, action : PayloadAction<ICharacterFullInfo> ){
            state.currentCharacter = action.payload;
        },
        incrementPage(state){
            state.page++;
        },
        clearCharacters(){
            return initialState;
        }
    },
    extraReducers:{
    [HYDRATE]:(state, action: PayloadAction<RootState>) => {
            const {page,characters, currentCharacter} = action.payload.characters;
            return {
                ...state, page, characters, currentCharacter
            };
        },

    [fetchCharacters.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
    [fetchCharacters.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
    [fetchCharacters.fulfilled.type]:(state,action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            if(action.payload.length < offset){
                state.fetchStatus = FetchStatus.Ended;
            }
            state.characters = [...state.characters, ...action.payload];
        },

    [fetchCharacter.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
    [fetchCharacter.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
    [fetchCharacter.fulfilled.type]:(state,action) => {
            state.fetchStatus = FetchStatus.Fulfilled;
            state.currentCharacter = action.payload;
        }
    }
});

export const { setFetchStatus, clearCharacters, setCharacters, setCurrentCharacter, incrementPage } = charactersSlice.actions;
export default charactersSlice.reducer;