import { RootState } from "../store/IceAndFireStore";

export const getBooks = (state: RootState) =>{
    const {books: booksInfo} = state;
    return booksInfo.items;
};

export const getBooksStoreInfo = (state: RootState) => {
    const {page, fetchStatus, offset} = state.books;
    return {page, fetchStatus, offset};
};

export const getBookFullInfo = (state : RootState) => {
    const {currentItem: currentBook} = state.books;
    return currentBook;
};