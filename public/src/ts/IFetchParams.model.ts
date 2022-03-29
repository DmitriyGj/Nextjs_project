export interface IFetchParams {
    page:number
    offset:number
}
export interface IFilter{
    [name: string]: {value:string | number | Date | boolean | null, type: 'date' | 'text' | 'checkbox'}
}

export interface BooksFilterParams extends IFilter{
    name:{value:string, type:'text'},
    fromReleaseDate: {value: string, type: 'text'},
    toReleaseDate: {value: string, type: 'text'}
};

export interface CharactersFilterParams extends IFilter{
    name: {value: string, type: 'text'}
    gender: {value: string, type: 'text'}
    culture: {value: string, type: 'text'}
    born: {value: string, type: 'text'}
    died: {value: string, type: 'text'}
    isAlive: {value: boolean, type: 'checkbox'}
}

export interface HousesFilterParams extends IFilter{
    name: {value: string, type: 'text'}
    region: {value: string, type: 'text'}
    words: {value: string, type: 'text'}
    hasWords: {value: boolean, type: 'checkbox'}
    hasTitles: {value: boolean, type: 'checkbox'}
    hasSeats: {value: boolean, type: 'checkbox'}
    hasDiedOut: {value: boolean, type: 'checkbox'}
    hasAncestralWeapons: {value: boolean, type: 'checkbox'}
}