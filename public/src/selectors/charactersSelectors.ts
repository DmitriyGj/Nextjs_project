import { RootState } from "../store/ChracterStore";

export const getCharacters = (state: RootState) => {
    const {characters: charactersInfo} = state;
    return charactersInfo.characters;
}

export const getCharactersStoreInfo = (state: RootState) => {
    const {page, fetchStatus, offset } = state.characters
    return {page, fetchStatus,offset};
}

export const getCharacterFullInfo = (state: RootState) => {
    const {currentCharacter} = state.characters
    return currentCharacter;
}