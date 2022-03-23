import { ICharacter } from './CharacterAPI.model';
import {ICharacterFullInfo} from '../../ts';
import { IceAndFireService } from '../IceAndFireAPI/IceAndFireService.model';
import {urlHelper} from '../../utilites/urlHelper';
import { directories } from '../../constants';

const {getId} = urlHelper;
class CharactersAPI extends IceAndFireService<ICharacter, ICharacterFullInfo>{
    constructor(){
        super();
    }
    override directory = directories.characters;
    async getMassiveData(page: number, amount: number): Promise<ICharacter[]> {
        const url = `${this.baseURL}/${this.directory}?page=${page}&pageSize=${amount}`;
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json: ICharacter [] = await response.json();
            const parsedData: ICharacter [] = json.map(character => {
                    return {...character, id:getId(character.url,this.baseURL,this.directory)};
                });

            return parsedData;
        }
        catch(e){
            throw new Error('Чел тут жесть') ;
        }
    }

    async getFullData(id: string): Promise<ICharacterFullInfo> {
        const url = `${this.baseURL}/${this.directory}/${id}`;
        try{
            const response = await fetch(url);
        
            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json = await response.json();

            const parsedData = {...json, 
                allegiances: json.allegiances.map((allegianceURL: string) => getId(allegianceURL, this.baseURL, directories.houses)),
                    spouse: getId(json.spouse, this.baseURL, this.directory),
                    mother: getId(json.mother, this.baseURL, this.directory),
                    father: getId(json.father, this.baseURL, this.directory) ,
                    books: json.books.map((bookURL:string )=> getId(bookURL, this.baseURL, directories.books))
                };

            return parsedData;
        }   
        catch(e){
            throw new Error('чел тут жесть');
        }
    }

    async getBaseDataById(id: string): Promise<ICharacter> {
        const url = `${this.baseURL}/${this.directory}/${id}`;
        try{
            const response = await fetch(url);
            
            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json = await response.json();

            const parsedData = {...json, id:getId(json.url,this.baseURL,this.directory) };

            return parsedData;
        }   
        catch(e){
            throw new Error('чел тут жесть');
        }
    }
}

export const CharacterAPI = new CharactersAPI();