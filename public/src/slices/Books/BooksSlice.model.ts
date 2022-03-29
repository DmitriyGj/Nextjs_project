import { FetchStatus } from "../../constants";
import { IBook } from "../../services";
import { IBookFullInfo } from "../../ts";
import { BooksFilterParams } from "../../ts/IFetchParams.model";

export interface IBooksState {
    page: number,
    fetchStatus: FetchStatus
    books: IBook[]
    currentBook: IBookFullInfo | null
    filter: BooksFilterParams | null
};
