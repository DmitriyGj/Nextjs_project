import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import booksReducer  from "../slices/books";
import charactersReducer from "../slices/characters";
import housesReducer from '../slices/houses';

const IceAndFireStore = configureStore({
    reducer:{
        books: booksReducer,
        characters: charactersReducer,
        houses: housesReducer
    }
});

const makeStore = () => IceAndFireStore;
export const wrapper = createWrapper(makeStore, {debug: true});

export type RootState = ReturnType<typeof IceAndFireStore.getState>
export type AppDispach = typeof IceAndFireStore.dispatch;