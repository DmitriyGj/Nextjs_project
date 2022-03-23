export interface IFetchParams {
    page:number
    offset:number
}

export interface IFilter{
    [name: string]: any
}

export interface BooksFilterParams extends IFilter{
    name:string,
    fromReleaseDate: Date,
    toReleaseDate: Date
};

export interface CharactersFilterParams extends IFilter{
    name: string
    gender: string
    culture: string
    born: string
    died: string
    isAlive: boolean
}

export interface HousesFilterParams extends IFilter{
    name: string
    region: string
    words: string
    hasWords: boolean
    hasTitles: boolean
    hasSeats: boolean
    hasDiedOut: boolean
    hasAncestralWeapons: boolean
}