import {IBook, IBookResponseInfo} from '../services/BookAPI/BookAPI.model';
import { ICharacter } from '../services';

export interface IBookFullInfo extends IBook {
    isbn: string
    numberOfPages: string
    publisher: string
    country: string
    mediaType: string
    released: string
    characters: ICharacter [] //ids
    povCharacters: ICharacter [] //ids
}