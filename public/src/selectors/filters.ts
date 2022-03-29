import { RootState } from "../store/IceAndFireStore";
import { IGenericBuffer } from "../ts";
import { BooksFilterParams, CharactersFilterParams, HousesFilterParams, IFilter} from "../ts/IFetchParams.model";
import { getCurrentBooksFilter } from "./books";
export const getBooksFilter = (state: RootState) : BooksFilterParams => state.filters.books;
export const getHousesFilter = (state: RootState) : HousesFilterParams => state.filters.houses;
export const getCharactersFilter = (state: RootState) : CharactersFilterParams=> state.filters.characters;
import { directories } from "../constants";

export const selectorsByDirectory: IGenericBuffer<(state: RootState) => IFilter> = {
    [`/${directories.books}`]: getBooksFilter,
    [`/${directories.houses}`]: getHousesFilter,
    [`/${directories.characters}`]: getCharactersFilter
};