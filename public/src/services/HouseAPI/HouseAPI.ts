import { IceAndFireService } from '../IceAndFireAPI/IceAndFireService';
import {urlHelper} from '../../utilites/urlHelper';
import { IHouse } from './HouseAPI.model';
import { IHouseFullInfo } from '../../ts';
import { directories } from '../../constants';

const {getId} = urlHelper;

class HousesAPI extends IceAndFireService<IHouse,IHouseFullInfo>{
    constructor(){
        super();
    }
    override directory = directories.houses;
    async getMassiveData(page: number, amount: number): Promise<IHouse[]> {
        const url = `${this.baseURL}/${this.directory}?page=${page}&pageSize=${amount}`;
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json: IHouse [] = await response.json();

            const parsedData: IHouse [] = json.map(house => {
                    return {...house, id:getId(house.url,this.baseURL,this.directory)};
                });
            return parsedData;
        }
        catch(e){
            throw new Error('Чел тут жесть');
        }
    }

    async getFullData(id: string): Promise<IHouseFullInfo> {
        const url = `${this.baseURL}/${this.directory}/${id}`;
        try{
            const response = await fetch(url);
        
            if(!response.ok){
                throw new Error('Что-то пошло не так');
            }

            const json:IHouseFullInfo = await response.json();

            const parsedData: IHouseFullInfo = {...json, 
                    currentLord: getId(json.currentLord, this.baseURL, directories.characters),
                    heir: getId(json.heir, this.baseURL, directories.characters),
                    overlord: getId(json.overlord, this.baseURL, directories.houses),
                    founder: getId(json.founder, this.baseURL, directories.characters),
                    cadetBranches: json.cadetBranches.map(houseURL => getId(houseURL,this.baseURL, directories.houses)),
                    swornMembers: json.swornMembers.map(characterURL => getId(characterURL, this.baseURL, directories.characters))
                };

            return parsedData;
        }   
        catch(e){
            throw new Error('чел тут жесть');
        }
    }
} 

export const HouseAPI = new HousesAPI();