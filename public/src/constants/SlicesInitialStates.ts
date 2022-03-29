import { ISlicesStatesInfo } from "../ts";
import { FetchStatus } from "./FetchStatus";
import { initPage } from "./queryConstants";

export const SlicesInitialStates: ISlicesStatesInfo = {
    books: {
        page: initPage,
        fetchStatus: FetchStatus.Needed,
        books: [],
        currentBook: null,
        filter: {name: {value:"" ,type:'text'},
                fromReleaseDate: {value:"" ,type:'text'},
                toReleaseDate: {value:"" ,type:'text'}}
    },
    characters: {
        page: initPage,
        fetchStatus: FetchStatus.Needed,
        characters: [],
        currentCharacter: null
    },
    houses: {
        page: initPage,
        fetchStatus: FetchStatus.Needed,
        houses: [],
        currentHouse: null
    },
    
};