import { fetchBooks, incrementPage } from "../public/src/reducers/BooksReducer";
import { getBooks, getBooksStoreInfo } from "../public/src/selectors/booksSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { FetchStatus } from "../public/src/constants/FetchStatus";

import { BookCard } from "../public/src/components/BookCard/BookCard";
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { withLayout } from "../public/src/HOC/Layout/Layout";
import { wrapper } from "../public/src/HOC/ReduxWeapper/ReduxWrapper";
import { createObserver } from "../public/src/constants/LoadObserver";

export const BooksPage = () => {
    const books = useSelector(getBooks);
    const {page, offset, fetchStatus} = useSelector(getBooksStoreInfo);
    const dispatch = useDispatch();

    const loadTarget = useRef(null);

    useEffect(()=>{     
        const observer = createObserver(fetchStatus === FetchStatus.Pending, ()=> dispatch(incrementPage()));
        if(loadTarget.current){
            observer.observe(loadTarget?.current);
        }
        console.log(fetchStatus)
        if(fetchStatus == FetchStatus.Ended && loadTarget.current){
            observer.unobserve(loadTarget.current);
        }

        return() =>{ 
            if(loadTarget.current ) {
                observer.unobserve(loadTarget.current);
            }
        };   
    },[loadTarget.current]);

    useEffect(()=>{
        const fetchParams: IFetchParams = {page, offset};
        dispatch(fetchBooks(fetchParams));
    },[page]);

    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {books?.map(card=>{ 
                    return (<Link href={`/books/${card.id}`} key={`books/${card.id}`}>
                                <a><BookCard {...card} /></a>
                            </Link>);})
                        }   
                </div>
                {fetchStatus === FetchStatus.Pending ?<Loader /> : <p ref = {loadTarget}>More</p>}
            </div>);
};

BooksPage.getInitialPageProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() => {
        return await dispatch(fetchBooks({page:1,offset:10}));
    }
);

export default withLayout(BooksPage);