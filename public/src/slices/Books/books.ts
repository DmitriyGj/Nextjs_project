import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FetchStatus, offset, SlicesInitialStates } from "../../constants";
import { IBook  } from "../../services";
import { RootState } from "../../store/IceAndFireStore";
import {  IBookFullInfo } from "../../ts";
import { BookAPI } from "../../services";

export const fetchBooks = createAsyncThunk(
    'books/fetchMassive',
    async (page:number) => {
        const response = await BookAPI.getMassiveData(page,offset);
        return response;
    }
);

export const fetchBook = createAsyncThunk(
    'books/fetchFullData',
    async (id: string) => {
        const response = await BookAPI.getFullData(id);
        return response;
    }
);

export const booksSlice: Slice =  createSlice({
    name:'books',
    initialState: SlicesInitialStates.books,
    reducers:{
        setFetchStatus(state, action : PayloadAction<FetchStatus>){
            state.fetchStatus = action.payload;
        },
        setBooks(state, action : PayloadAction<IBook []> ){
            state.books = action.payload;
        },
        setCurrentBook(state, action : PayloadAction<IBookFullInfo> ){
            state.currentBook = action.payload;
        },
        incrementPage(state){
            state.page++;
        },
        clearBooks(){
            return SlicesInitialStates.books;
        }
    },
    extraReducers:{
        [HYDRATE]:(state, action: PayloadAction<RootState>) => {
            const { page, books, currentBook } = action.payload.books;
            return {
                ...state, page, books, currentBook
            };
        },

        [fetchBooks.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
        [fetchBooks.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
        [fetchBooks.fulfilled.type]:(state,action: PayloadAction<IBook[]>) => {
            if(!action.payload){
                return {...state, books: [], fetchStatus: FetchStatus.Fulfilled};
            }
            state.fetchStatus = FetchStatus.Fulfilled;
            if(action.payload.length < offset){
                state.fetchStatus = FetchStatus.Ended;
            }
            state.books = [...state.books, ...action.payload];
        },

        [fetchBooks.pending.type]:(state) => {
            state.fetchStatus = FetchStatus.Pending;
        },
        [fetchBook.rejected.type]:(state) => {
            state.fetchStatus = FetchStatus.Rejected;
        },
        [fetchBook.fulfilled.type]:(state,action: PayloadAction<IBookFullInfo>) => {
            if(!action.payload){
                return {...state, fetchStatus: FetchStatus.Rejected};
            }
            state.currentBook = action.payload;
            state.fetchStatus = FetchStatus.Fulfilled;
        }
    }
});

export const { setFetchStatus, clearBooks , setBooks, incrementPage, setCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;
