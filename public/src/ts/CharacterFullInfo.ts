import { ICharacter } from "../services/IceAndFireAPI/IceAndFire.model";

export interface ICharacterFullInfo extends ICharacter{
    born: string
    died: string
    titles: string []
    aliases: string []
    father: string
    mother: string
    spouse: string
    allegiances: string []
    books: string []
    povBooks: string []
    playedBy: string []
}