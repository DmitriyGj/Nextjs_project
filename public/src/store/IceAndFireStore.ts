import {BooksReducer} from '../reducers';
import {CharactersReducer} from  '../reducers'
import {HousesReducer} from '../reducers'
import { configureStore } from "@reduxjs/toolkit";

export const IceAndFireStore = configureStore(
    {reducer:
        {   
            characters: CharactersReducer,
            books: BooksReducer,
            houses: HousesReducer
        }
    });

export type RootState = ReturnType<typeof IceAndFireStore.getState>;
export type AppDispatch = typeof IceAndFireStore.dispatch;