import {useEffect, useRef } from 'react';

import { BookCard } from "../../public/src/components/BookCard/BookCard";
import { GetStaticProps } from "next";
import Link from "next/link";
import { createObserver, FetchStatus } from '../../public/src/constants';
import { RootState, wrapper } from '../../public/src/store/IceAndFireStore';
import { useSelector } from 'react-redux';

import { IBookCardProps } from '../../public/src/components/BookCard/BookCard.props';
import { clearBooks, incrementPage } from '../../public/src/slices/books';
import { useAppDispatch, useAppSelector } from '../../public/src/store/hooks';
import { getBooks, getPage } from '../../public/src/selectors/books';
import { fetchBooks } from '../../public/src/slices/books';

export const BooksPage = ( ) => { 
    const books = useAppSelector(getBooks);
    const { fetchStatus } = useSelector((state: RootState) => state.books);
    const page: number = useAppSelector(getPage);
    const loadTarget = useRef(null);
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () =>  {
                if(fetchStatus !== FetchStatus.Ended){
                    dispatch(incrementPage(null));
                }
        });

        if(current){
            observer.observe(current);
        }

        if(fetchStatus === FetchStatus.Ended && current){
            observer.unobserve(current);
        }

        return() =>{
            if(current){
                observer.unobserve(current);
            }
        };
    });

    useEffect(() => { ( async () => {
        try{
            dispatch(fetchBooks(page));
        }
        catch(e){
            console.log(e);
        }
    })();
    },[page]);

    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {books.map((card: IBookCardProps) => { 
                    return (<Link href={`/books/${card.id}`} key={`books/${card.id}`}>
                                <a><BookCard {...card} /></a>
                            </Link>);}) 
                }
                <p ref={loadTarget}>{fetchStatus === FetchStatus.Ended ?'It\'s all' : 'More' }</p>
                </div>
            </div>);
};

export const getStaticProps : GetStaticProps = wrapper.getStaticProps(store => async () => {
    try{
        const { page } = store.getState().books;
        store.dispatch(fetchBooks(page));
        return { props: { books:[]  } };
    }
    catch(e){
        return { props: { books:[] } };
    }
});

export default BooksPage;