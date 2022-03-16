import { IBook } from "../services";
import { RootState } from "../store/IceAndFireStore";
import { IBookFullInfo } from "../ts";

export const getBooks = (state: RootState) : IBook [] => state.books.books;
export const getCurrentBook = (state: RootState) : IBookFullInfo => state.books.currentBook;
export const getPage = (state:RootState) : number => state.books.page;
