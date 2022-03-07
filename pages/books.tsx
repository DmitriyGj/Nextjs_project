import { fetchBooks, incrementPage } from "../public/src/reducers/BooksReducer";
import { getBooks, getBooksStoreInfo } from "../public/src/selectors/booksSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { BookCard } from "../public/src/components/BookCard/BookCard";
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import {v4 as uuid}  from 'uuid';
import { withLayout } from "../public/src/HOC/Layout/Layout";

export const BooksPage = () => {
    const books = useSelector(getBooks);
    const {page, offset, fetchStatus} = useSelector(getBooksStoreInfo);
    const dispatch = useDispatch();

    const loadTarget = useRef(null);

    useEffect(()=>{     
        const interactionHandle = (entries:IntersectionObserverEntry[]) => {
            entries.forEach(entrie => {
                if(fetchStatus !== 'pending' && entrie.isIntersecting && entrie.intersectionRatio > 0.95){
                    dispatch(incrementPage())
                }
            })
        }
        const observer = new IntersectionObserver(interactionHandle, InteractionObserverStandatrOptions)
        if(loadTarget.current){
            observer.observe(loadTarget.current)
        }
        return() =>{ 
            if(loadTarget.current){
                observer.unobserve(loadTarget.current);
            }
}    },[loadTarget.current]);

    useEffect(()=>{
        const fetchParams = {page, offset} as IFetchParams
        dispatch(fetchBooks(fetchParams));
    },[page])

    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {books && books.map(card=>{ 
                    return (<Link href={`/books/${card.id}`} key = {uuid()}>
                                <a>< BookCard {...card} / ></a>
                            </Link>)})
                        }   
                </div>
                {fetchStatus === 'pending' ? <Loader/> : <p>More</p>}
            </div>)
}

export default withLayout(BooksPage);