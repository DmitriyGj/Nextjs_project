import { setHouses, setCurrentHouse, clearHouses } from './Houses/houses';
import { setBooks, setCurrentBook, clearBooks } from './Books/books';
import { setCharacters, setCurrentCharacter, clearCharacters } from './Characters/characters';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IGenericBuffer } from '../ts';
import {  setCharactersFilter, setHousesFilter, setBooksFilter } from './Filters/filters';
import { directories } from '../constants';
export { setBooksFilter,setHouses, setCurrentHouse, clearHouses, setBooks, setCurrentBook, clearBooks, setCharacters, setCurrentCharacter, clearCharacters };

export const setFiltersByDirectory: IGenericBuffer<ActionCreatorWithPayload<any, any>> = {
    [`/${directories.books}`]: setBooksFilter,
    [`/${directories.houses}`]: setHousesFilter,
    [`/${directories.characters}`]: setCharactersFilter  
};