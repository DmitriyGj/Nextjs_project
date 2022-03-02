import { ICharacterCard } from './IceAndFire.model';
import {ICharacterFullInfo} from '../../ts/CharacterFullInfo';
import { urlHelper } from '../../utilites/urlHelper';

const {getId} = urlHelper;
export class IceAndFireService{
    static baseURL: string = 'https://www.anapioficeandfire.com/api';
    static directories = {characters: '/characters/', 
                        books: '/books/',
                        allegiances: '/houses/'};

    static async getCharacters(page:number, amount: number) {
        const url = `${this.baseURL}/characters?page=${page}&pageSize=${amount}`;
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }
            const json: ICharacterCard[] = await response.json();
            
            const parsedData: ICharacterCard[] = json.map(item => {
                    return {...item, id: getId(item.url,this.baseURL, this.directories.characters)}
                });

            return parsedData ;
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
            const parsedData = {...json, 
                allegiances: json.allegiances.map(allegiance => getId(allegiance, this.baseURL, this.directories.allegiances)),
                spouse: getId(json.spouse, this.baseURL, this.directories.characters),
                mother: getId(json.mother, this.baseURL, this.directories.characters),
                father: getId(json.father, this.baseURL, this.directories.characters) ,
                books: json.books.map(book => getId(book, this.baseURL, this.directories.books))
            };
            console.log(json)
            return parsedData;
        }
        catch(e){
            console.log('чел тут жесть');
        }
    }
}


