import booksReducer from '../reducers/BooksReducer';
import charactersReducer from  '../reducers/CharactersReducer'
import { configureStore } from "@reduxjs/toolkit";

export const IceAndFireStore = configureStore(
    {reducer:
        {characters: charactersReducer,
            books: booksReducer
        }
    });

export type RootState = ReturnType<typeof IceAndFireStore.getState>;
export type AppDispatch = typeof IceAndFireStore.dispatch;