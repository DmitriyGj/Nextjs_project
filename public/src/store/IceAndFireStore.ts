import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import booksReducer  from "../slices/Books/books";
import charactersReducer from "../slices/Characters/characters";
import housesReducer from '../slices/Houses/houses';
import filtersReducer from "../slices/Filters/filters";

const IceAndFireStore = configureStore({
    reducer:{
        books: booksReducer,
        characters: charactersReducer,
        houses: housesReducer,
        filters: filtersReducer
    }
});

const makeStore = () => IceAndFireStore;
export const wrapper = createWrapper(makeStore, {debug: true});

export type RootState = ReturnType<typeof IceAndFireStore.getState>
export type AppDispach = typeof IceAndFireStore.dispatch;