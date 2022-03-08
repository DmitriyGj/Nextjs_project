import { RootState } from "../store/IceAndFireStore";

export const getCharacters = (state: RootState) => {
    const {characters: charactersInfo} = state; 
    return charactersInfo.items;
};

export const getCharactersStoreInfo = (state: RootState) => {
    const {page, fetchStatus, offset } = state.characters;
    return {page, fetchStatus,offset};
};

export const getCharacterFullInfo = (state: RootState) => {
    const {currentItem:currentCharacter} = state.characters;
    return currentCharacter;
};