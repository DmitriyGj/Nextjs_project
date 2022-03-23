import { IBooksState } from "../slices/Books/BooksSlice.model";
import { ICharacterState } from "../slices/Characters/CharactersSlice.model";
import { IHouseState } from "../slices/Houses/HousesSlice.model";

export interface ISlicesStatesInfo {
    books: IBooksState
    characters: ICharacterState
    houses: IHouseState
}
