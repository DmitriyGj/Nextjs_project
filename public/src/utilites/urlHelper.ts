import {directories}  from '../constants/Directories';

export class urlHelper {
    static directories = {characters: directories.characters, 
                            books: directories.books,
                            houses: directories.houses};
    static  getId = (endPoint:string , baseURL: string, directory: string) => {
        let res = endPoint.replace(`${baseURL}/${directory}/`,'');
        
        if(res >= endPoint){
            res = endPoint.replace(`${baseURL.replace('www.','')}/${directory}/`,'');
        }

        if(res >= endPoint){
            res = endPoint.replace(`${baseURL.replace('https://www','')}/${directory}/`,'');
        }

        return res;
    };
}

