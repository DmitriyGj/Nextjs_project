import { FetchStatus } from "../../constants"
import { IBook } from "../../services"
import { IBookFullInfo } from "../../ts"

export interface IBooksState {
    page: number,
    fetchStatus: FetchStatus
    books: IBook[]
    currentBook: IBookFullInfo | null
};
