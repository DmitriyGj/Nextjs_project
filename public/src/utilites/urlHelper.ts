
export class urlHelper {
    static  getId = (endPoint:string , baseURL: string, directory: string) => {
        const res = endPoint.replace(`${baseURL}${directory}`,'');
        return res;
    }
}