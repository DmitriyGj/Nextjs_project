import { IceAndFireBaseURL } from "../../constants";

export abstract class IceAndFireService<T,F>{
    baseURL: string = IceAndFireBaseURL;
    abstract directory:string; 
    abstract  getMassiveData(page:number , amoun: number):Promise<T[]>
    abstract getFullData(id: string): Promise<F>
}


