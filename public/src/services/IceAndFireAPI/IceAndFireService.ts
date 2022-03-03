export abstract class IceAndFireService<T,F>{
    baseURL: string = 'https://www.anapioficeandfire.com/api';
    abstract directory:string; 
    abstract  getMassiveData(page:number , amoun: number):Promise<T[]>
    abstract getFullData(id: string): Promise<F>
}


