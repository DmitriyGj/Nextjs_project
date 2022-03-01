import {ICharacter} from '../services/IceAndFireAPI/IceAndFire.model'
import { ICharacterFullInfo } from './CharacterFullInfo'

export interface ICharactersState {
    fetchStatus: 'needed' | 'fulfilled' | 'rejected' | 'pending'
    isLoad:boolean
    characters: ICharacter[]
    page: number
    offset: number
    currentCharacter: ICharacterFullInfo | undefined
}

export interface IFetchParams {
    page:number
    offset:number
}