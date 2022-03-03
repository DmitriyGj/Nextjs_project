import { ICharacterCard } from './CharacterAPI.model';
import {ICharacterFullInfo} from '../../ts/CharacterFullInfo'
import { IceAndFireService } from '../IceAndFireAPI/IceAndFireService';
import {urlHelper} from '../../utilites/urlHelper';

const {getId} = urlHelper;
class CharacterAPIAbs extends IceAndFireService<ICharacterCard, ICharacterFullInfo>{
    constructor(){
        super()
    }
    override directory = 'characters';
    async getMassiveData(page: number, amount: number): Promise<ICharacterCard[]> {
        const url = `${this.baseURL}/${this.directory}?page=${page}&pageSize=${amount}`;

        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json: ICharacterCard [] = await response.json();

            const parsedData: ICharacterCard [] = json.map(character => {
                    return {...character, id:getId(character.url,this.baseURL,this.directory)}
                });
                
            return parsedData;
        }
        catch(e){
            throw new Error('Чел тут жесть')
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
                allegiances: json.allegiances.map((allegianceURL: string) => getId(allegianceURL, this.baseURL, 'houses')),
                    spouse: getId(json.spouse, this.baseURL, this.directory),
                    mother: getId(json.mother, this.baseURL, this.directory),
                    father: getId(json.father, this.baseURL, this.directory) ,
                    books: json.books.map((bookURL:string )=> getId(bookURL, this.baseURL, 'books'))
                };

            return parsedData;
        }   
        catch(e){
            throw new Error('чел тут жесть');
        }
    }
}

export const CharacterAPI = new CharacterAPIAbs();