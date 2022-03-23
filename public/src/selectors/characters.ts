import { FetchStatus } from "../constants";
import { RootState } from "../store/IceAndFireStore";

export const getCharacters = (state: RootState) => state.characters.characters;
export const getCurrentCharacter = (state: RootState) => state.characters.currentCharacter;
export const getPage = (state:RootState) => state.characters.page;
export const getFetchStatusCharacters = (state: RootState) : FetchStatus => state.books.fetchStatus;