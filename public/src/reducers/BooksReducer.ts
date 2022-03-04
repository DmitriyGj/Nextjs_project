import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BookAPI } from "../services/BookAPI/BookAPI";
import { CharacterAPI } from "../services/CharacterAPI/CharacterAPI";
import { IBook } from "../services";
import { IBookFullInfo } from "../ts";
import { IFetchParams } from "../ts/characterSlice.model";
import { IReducerState } from "../ts";

const initialState: IReducerState<IBook, IBookFullInfo>  = {
    fetchStatus:'needed',
    isLoad:false,
    items:[],
    page:1,
    offset: 10,
    currentItem: undefined
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (params: IFetchParams) => {
        const response = await BookAPI.getMassiveData(params.page,params.offset);
        return response;
    });

export const fetchBookInfo =  createAsyncThunk(
    'books/getBook',
    async (id: string) => {
        const response = await BookAPI.getFullData(id);
        return response;
    }
)


const booksSlice = createSlice({
    name:'books',
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
        builder.addCase(fetchBooks.pending, (state) => {
            state.fetchStatus = 'pending'
        }),
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled'
            state.items = [...state.items, ...action.payload]
        }),
        builder.addCase(fetchBooks.rejected, (state) => {
            state.fetchStatus = 'rejected'
        }),
        builder.addCase(fetchBookInfo.pending, (state) => {
            state.fetchStatus = 'pending';
        }),
        builder.addCase(fetchBookInfo.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.currentItem = action.payload;
        })
    }
});

export const {toggleIsLoad, incrementPage} =  booksSlice.actions;
export default booksSlice.reducer;