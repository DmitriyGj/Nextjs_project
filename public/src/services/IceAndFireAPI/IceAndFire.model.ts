export interface IIceAndFireAPI<T,F>{
    baseURL: 'www.anapioficeandfire.com/api'
    directory: string
    getSingleData(id:string): Promise<F>
    getPaginatedData?(amount: number, page: number): Promise<T[]>   
}