import { fetchBooks, incrementPage } from "../public/src/reducers/BooksReducer";
import { getBooks, getBooksStoreInfo } from "../public/src/selectors/booksSelector";
import { useDispatch, useSelector } from "react-redux";

import { BookCard } from "../public/src/components/BookCard/BookCard";
import { IFetchParams } from "../public/src/ts";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { useEffect } from "react";
import { withLayout } from "../public/src/HOC/Layout/Layout";

export const BooksPage = () => {
    const books = useSelector(getBooks);
    const {page, offset, fetchStatus} = useSelector(getBooksStoreInfo);
    const dispatch = useDispatch();

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return() => window.removeEventListener('scroll',handleScroll);
    })

    useEffect(()=>{
        const fetchParams = {page, offset} as IFetchParams
        dispatch(fetchBooks(fetchParams));
    },[page])

    const handleScroll = (e: Event) => {
        const isNearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight + 380;
        if(isNearBottom){
            if(fetchStatus !== 'pending'){
                dispatch(incrementPage());
            }
        }
    };

    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {books && books.map((card, index) =>{ 
                    return (<Link href={`/characters/${card.id}`} key = {index}>
                                <a>< BookCard {...card} / ></a>
                            </Link>)})
                        }   
                </div>
                {fetchStatus === 'pending' ? <Loader/> : <p>More</p>}
            </div>)
}

export default withLayout(BooksPage);