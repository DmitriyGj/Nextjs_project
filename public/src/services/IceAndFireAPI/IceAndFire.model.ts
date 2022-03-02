export interface ICharacter{
    url:string
    id:string
    name:string
    gender: string
    culture: string
}

export interface IHouse {
    url: string
    id: string
    name: string
    region: string
}

export interface IHouseFullInfo extends IHouse{
    region
}