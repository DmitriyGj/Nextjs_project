import { ICharacter } from './IceAndFire.model';
import {ICharacterFullInfo} from '../../ts/CharacterFullInfo';
import { urlHelper } from '../../utilites/urlHelper';

const {getId} = urlHelper;
export class IceAndFireService{
    static baseURL: string = 'https://www.anapioficeandfire.com/api';
    static directories = {characters: '/characters/', 
                        books: '/books/'};

    static async getCharacters(page:number, amount: number) {
        const url = `${this.baseURL}/characters?page=${page}&pageSize=${amount}`;
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }
            const json: ICharacter[] = await response.json();
            
            const parsedData = json.map(data => {
                    return {...data, id: getId(data.url,this.baseURL, this.directories.characters)}
                });

            return parsedData;
        }
        catch(e){
            console.log('не ну друг, реально что-то пошло не так');
        }
    }

    static async getCharacter(id: string){
        const url = `${this.baseURL}${this.directories.characters}${id}`;
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }
            
            const json : ICharacterFullInfo = await response.json();
            console.log(json)
            return json;
        }
        catch(e){
            console.log('чел тут жесть');
        }
    }
}


