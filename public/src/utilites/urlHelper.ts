import {directories}  from '../constants/Directories'

export class urlHelper {
    static directories = {characters: directories.characters, 
                            books: directories.books,
                            houses: directories.houses};
    static  getId = (endPoint:string , baseURL: string, directory: string) => {
        const res = endPoint.replace(`${baseURL}/${directory}/`,'');
        return res;
    }
}

