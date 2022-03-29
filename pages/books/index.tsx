import { BookCard } from "../../public/src/components/BookCard/BookCard";
import { GetStaticProps } from "next";
import { wrapper } from '../../public/src/store/IceAndFireStore';

import { clearBooks, incrementPage } from '../../public/src/slices/Books/books';
import { getBooks, getFetchBooksStatus, getPage } from '../../public/src/selectors/books';
import { fetchBooks } from '../../public/src/slices/Books/books';
import{ IWithContentPageProps, PageWithFetchContent } from '../../public/src/HOC/PageWithFetchContent/PageWithFetchContent';

const BooksPagePprops: IWithContentPageProps = {
    title: 'Book\'s',
    ContentCard: BookCard ,
    getPage,
    getFetchStatus: getFetchBooksStatus,
    getContent: getBooks,
    clearContent: clearBooks,
    incrementPage,
    fetchContent: fetchBooks,
};

const BooksPage = ( ) => { 
    return(<PageWithFetchContent {...BooksPagePprops} />);
};

export const getStaticProps : GetStaticProps = wrapper.getStaticProps(store => async () => {
    try{
        store.dispatch(clearBooks(null));
        const { page } = store.getState().books;
        store.dispatch(fetchBooks({page,filter:store.getState().filters.books}));
    }
    catch(e){
        console.log(e);
    }
    finally{
        return { props: { books:[] } };
    }
});

export default BooksPage;