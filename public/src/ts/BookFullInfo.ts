import {IBook} from '../services/BookAPI/BookAPI.model';

export interface IBookFullInfo extends IBook {
    isbn: string
    numberOfPages: string
    publisher: string
    country: string
    mediaType: string
    released: string
    characters: string [] //ids
    povCharacters: string [] //ids
}