import { FetchStatus } from "../constants";
import { RootState } from "../store/IceAndFireStore";
import { CharactersFilterParams } from "../ts/IFetchParams.model";

export const getCharacters = (state: RootState) => state.characters.characters;
export const getCurrentCharacter = (state: RootState) => state.characters.currentCharacter;
export const getPage = (state:RootState) => state.characters.page;
export const getFetchStatusCharacters = (state: RootState) : FetchStatus => state.characters.fetchStatus;
export const getCurrentCHaractersFilter = (state: RootState) : CharactersFilterParams => state.filters.characters;