import { IHouse } from '../services/HouseAPI/HouseAPI.model';

export interface IHouseFullInfo extends IHouse{
    words: string
    titles: string []
    seats: string []
    currentLord: string       //id
    heir: string              //id
    overlord: string          //id
    founded: string
    founder: string           // id
    diedOut: string
    ancestralWeapons: string []
    cadetBranches: string []  //ids
    swornMembers: string []   //ids
}
