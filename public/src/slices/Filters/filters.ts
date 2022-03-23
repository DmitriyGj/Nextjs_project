import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from "../../store/IceAndFireStore";
import { BooksFilterParams, CharactersFilterParams, HousesFilterParams } from "../../ts/IFetchParams.model";

const houseFilter : HousesFilterParams = {
    name: '',
    region: '',
    words: '',
    hasWords: false,
    hasTitles: false,
    hasSeats: false,
    hasDiedOut: false,
    hasAncestralWeapons: false,
};

const booksFilter : BooksFilterParams = {
    name: "",
    _fromReleaseDate: null,
    get fromReleaseDate() {
        if(!this._fromReleaseDate){
            return '';
        }
        return this._fromReleaseDate;
    },
    set fromReleaseDate(value) {
        this._fromReleaseDate = value;
    },
    _toReleaseDate: null,
    get toReleaseDate() {
        return this._toReleaseDate;
    },
    set toReleaseDate(value) {
        this._toReleaseDate = value;
    },
};

const charactersFilter : CharactersFilterParams = {
    name: "",
    gender: "",
    culture: "",
    born: "",
    died: "",
    isAlive: false
};

const filtersSlice = createSlice({
    name:'filters',
    initialState:{books: booksFilter, houses: houseFilter, characters: charactersFilter} ,
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