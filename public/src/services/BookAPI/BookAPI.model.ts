import { ICard } from "../../ts";

export interface IBook extends ICard{
    authors: string []
}

export interface IBookResponseInfo extends IBook{
    isbn: string
    numberOfPages: string
    publisher: string
    country: string
    mediaType: string
    released: string
    characters:string [] //id
    povCharacters: string [] //id
}