import {directories}  from '../constants/Directories';

export class urlHelper {
    static directories = {characters: directories.characters, 
                            books: directories.books,
                            houses: directories.houses};
    static  getId = (endPoint:string , baseURL: string, directory: string) => {
        let res = endPoint;
        if(res.includes('www.')){
            res = res.replace(`www.`,'');
        }
        
        res = res.replace(`${baseURL}/${directory}/`,'');
        return res;
    };
}

