import {useEffect, useRef, useState} from 'react';

import { BookAPI } from "../../public/src/services";
import { BookCard } from "../../public/src/components/BookCard/BookCard";
import { GetStaticProps } from "next";
import { IBook } from '../../public/src/services';
import { IBookCardProps } from "../../public/src/components/BookCard/BookCard.props";
import Link from "next/link";
import { createObserver } from '../../public/src/constants';
import { withLayout } from "../../public/src/HOC/Layout/Layout";
import { offset, initPage} from '../../public/src/constants';
interface BooksPageProps extends Record<string,unknown> {
    books: IBookCardProps[]
}

export const BooksPage = ({books} : BooksPageProps) => { 
    const [page, setPage] = useState<number>(2);
    const [fetchedCards, setFetchedCards] = useState<IBook[]>(books);
    const loadTarget = useRef(null);

    useEffect(() =>{
        (async() => {
            const newCards = await BookAPI.getMassiveData(page,offset);
            setFetchedCards([...fetchedCards,...newCards]);
        })();
    }, 
    [page]);

    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () => {setPage(page+1);});
        if(current){
            observer.observe(current);
        }

        return() =>{
            if(current){
                observer.unobserve(current);
            }
        };
    });

    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {fetchedCards.map(card => { 
                    return (<Link href={`/books/${card.id}`} key={`books/${page}/${card.id}`}>
                                <a><BookCard {...card} /></a>
                            </Link>);}) 
                    }   
                </div>
                <p ref={loadTarget}>It&apos;s all</p>
            </div>);
};

export const  getStaticProps: GetStaticProps<BooksPageProps> = async (ctx) => {
    try{
        const res = await BookAPI.getMassiveData(initPage,offset);
        return {
            props: {
                books:res
            }
        };
    }
    catch(e){
        return { props : { books:[] } };
    }
};

export default BooksPage;