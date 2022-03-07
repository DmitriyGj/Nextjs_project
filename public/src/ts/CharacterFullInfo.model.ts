import {ICharacter} from '../services/CharacterAPI/CharacterAPI.model'

export interface ICharacterFullInfo extends ICharacter{
    born: string
    died: string
    titles: string []
    aliases: string [] //ids
    father: string
    mother: string
    spouse: string
    allegiances: string []
    books: string [] //ids
    povBooks: string []//ids
    playedBy: string []//names
}