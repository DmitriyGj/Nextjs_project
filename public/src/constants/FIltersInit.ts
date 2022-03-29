import { IGenericBuffer } from "../ts";
import { IFilter } from "../ts/IFetchParams.model";
import { directories } from "./Directories";

const BooksFilters: IGenericBuffer<IFilter> = {
    [directories.characters]: {
        name:{ value: '', type:'text' },
        gender: { value: '', type: 'text' },
        culture:{ value: '', type: 'text' },
        born: { value: '', type: 'text' },
        died: { value: '', type: 'text' },
        isAlive: { value: null, type: 'checkbox'}
    },
    [directories.books]: { 
        name: { value:'', type:'text' },
        fromReleaseDate: { value: null, type: 'date' },
        toReleaseDate: { value: null, type: 'date' }
    },
    [directories.houses]: {
        name: { value:'', type:'text'},
        region: { value:'', type:'text' },
        words: { value:'', type:'text' },
        hasWords: { value: null, type:'checkbox' },
        hasTitles: { value: null, type:'checkbox' },
        hasDiedOut: { value: null, type:'checkbox' },
        hasAncestralWeapons: { value: null, type: 'checkbox' }
    }
};