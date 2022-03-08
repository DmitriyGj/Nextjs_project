export interface IBook{
    url:string
    id:string
    name:string
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