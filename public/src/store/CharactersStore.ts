import charactersReducer from  '../reducers/CharactersReducer'
import { configureStore } from "@reduxjs/toolkit";

export const charactersStore = configureStore(
    {reducer:
        {characters: charactersReducer
        }
    });

export type RootState = ReturnType<typeof charactersStore.getState>;
export type AppDispatch = typeof charactersStore.dispatch;