import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BooksFilterParams, CharactersFilterParams, HousesFilterParams } from "../../ts/IFetchParams.model";

const houseFilter : HousesFilterParams = {
    name: {value:"" ,type:'text'},
    region: {value:"" ,type:'text'},
    words: {value:"" ,type:'text'},
    hasWords: {value:false ,type:'checkbox'},
    hasTitles: {value:false ,type:'checkbox'},
    hasSeats: {value:false ,type:'checkbox'},
    hasDiedOut: {value:false ,type:'checkbox'},
    hasAncestralWeapons: {value:false ,type:'checkbox'},
};

export const initBooksFilter : BooksFilterParams = {
    name: {value:"" ,type:'text'},
    fromReleaseDate: {value:"" ,type:'text'},
    toReleaseDate: {value:"" ,type:'text'},
};

const charactersFilter : CharactersFilterParams = {
    name: {value:"" ,type:'text'},
    gender: {value:"" ,type:'text'},
    culture: {value:"" ,type:'text'},
    born: {value:"" ,type:'text'},
    died: {value:"" ,type:'text'},
    isAlive: {value:false ,type:'checkbox'}
};

const filtersSlice = createSlice({
    name:'filters',
    initialState:{books: initBooksFilter, houses: houseFilter, characters: charactersFilter} ,
    reducers:{
        setBooksFilter(state, action: PayloadAction<BooksFilterParams>){
            state.books = action.payload;
        },
        
        setCharactersFilter(state, action: PayloadAction<CharactersFilterParams>){
            state.characters = action.payload;
        },
        
        setHousesFilter(state, action: PayloadAction<HousesFilterParams>){
            state.houses = action.payload;
        }
    },
});

export const { setBooksFilter, setCharactersFilter, setHousesFilter } = filtersSlice.actions;
export default filtersSlice.reducer; 