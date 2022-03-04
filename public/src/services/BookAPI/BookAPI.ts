import { IceAndFireService } from '../IceAndFireAPI/IceAndFireService';
import {IBook} from './BookAPI.model';
import {IBookFullInfo} from '../../ts';
import {urlHelper} from '../../utilites/urlHelper';
import { directories } from '../../constants';

const {getId} = urlHelper;
class BooksAPI extends IceAndFireService<IBook,IBookFullInfo>{
    constructor(){
        super()
    }
    override directory = directories.books;
    async getMassiveData(page: number, amount: number): Promise<IBook[]> {
        const url = `${this.baseURL}/${this.directory}?page=${page}&pageSize=${amount}`;

        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json: IBook [] = await response.json();

            const parsedData: IBook [] = json.map(book => {
                    return {...book, id:getId(book.url,this.baseURL,this.directory)}
                });

            return parsedData;
        }
        catch(e){
            throw new Error('Чел тут жесть')
        }
    }

    async getFullData(id: string): Promise<IBookFullInfo> {
        const url = `${this.baseURL}/${this.directory}/${id}`;
        try{
            const response = await fetch(url);
        
            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json: IBookFullInfo = await response.json();

            const parsedData: IBookFullInfo = {...json, 
                characters: json.characters.map(character => getId(character, this.baseURL, directories.characters)),
                povCharacters: json.povCharacters.map((character: string) => getId(character, this.baseURL, directories.characters))
                };

            return parsedData;
        }   
        catch(e){
            throw new Error('чел тут жесть');
        }
    }
} 

export const BookAPI = new BooksAPI();