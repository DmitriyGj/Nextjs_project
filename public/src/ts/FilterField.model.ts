export interface FilterField{ 
    name: string 
    value: string | Date | boolean | number
    type: 'date' | 'text' | 'checkbox'
}