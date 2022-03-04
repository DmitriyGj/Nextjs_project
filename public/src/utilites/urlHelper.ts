import {dirictories} 
export class urlHelper {
    static directories = {characters: 'characters', 
                            books: 'books',
                            houses: 'houses'};
    static  getId = (endPoint:string , baseURL: string, directory: string) => {
        const res = endPoint.replace(`${baseURL}/${directory}/`,'');
        return res;
    }
}