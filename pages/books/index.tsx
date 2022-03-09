import { GetServerSideProps, GetStaticPaths, GetStaticPaths, GetStaticProps } from "next";
import { fetchBooks, incrementPage } from "../../public/src/reducers/BooksReducer";
import { getBooks, getBooksStoreInfo } from "../../public/src/selectors/booksSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { BookAPI } from "../../public/src/services";
import { BookCard } from "../../public/src/components/BookCard/BookCard";
import { FetchStatus } from "../../public/src/constants";
import { IBookCardProps } from "../../public/src/components/BookCard/BookCard.props";
import Link from "next/link";
import { Loader } from "../../public/src/components/Loader/Loader";
import { connect } from "react-redux";
import { createObserver } from "../../public/src/constants/LoadObserver";
import { withLayout } from "../../public/src/HOC/Layout/Layout";
import { wrapper } from "../../public/src/HOC/ReduxWeapper/ReduxWrapper";

interface BooksPageProps extends Record<string,unknown> {
    books: IBookCardProps[]
}

export const BooksPage = ({books} : BooksPageProps) => {
    const dispatch = useDispatch();
    const {page, offset, fetchStatus} = useSelector(getBooksStoreInfo);
    const newBooks = useSelector(getBooks);
    const loadTarget = useRef(null);
    let Message = 'More';

    useEffect(()=>{     
        const observer = createObserver(true, ()=> dispatch(incrementPage()));
        
        if(loadTarget.current){
            observer.observe(loadTarget?.current);
        }

        if(fetchStatus === FetchStatus.Ended){
            Message = 'Its all'
            if(loadTarget.current){
                observer.unobserve(loadTarget.current)
            }
        }
        
        return() =>{ 
            if(loadTarget.current ) {
                observer.unobserve(loadTarget.current);
            }
        };   
    },[loadTarget.current]);

    useEffect(() => {
        dispatch(fetchBooks({page,offset}))
    },[page])


    return(<div>
            <h1>Book&apos;s List</h1>
                <div>
                {(books.length < newBooks.length ? newBooks: books)?.map(card=>{ 
                    return (<Link href={`/books/${card.id}`} key={`books/${card.id}`}>
                                <a><BookCard {...card} /></a>
                            </Link>);})
                        }   
                { fetchStatus === FetchStatus.Pending ?  <Loader /> : <p ref={loadTarget}>{Message}</p>}
                </div>
            </div>);
};

BooksPage.getInitialProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() => {
        return await dispatch(fetchBooks({page:1,offset:10}));
    }
);

// export const getStaticPaths: GetStaticPaths = async() =>{
//     const res =  await BookAPI.getMassiveData(1,10);
//     const paths = res.map(book => `/${book.id}`);
//     return {paths, fallback:true};
// }

export const  getStaticProps: GetStaticProps<BooksPageProps> = async (ctx) => {
    const res = await BookAPI.getMassiveData(1,10);
    return {
        props: {
        books:res
        }
    }
} 

export default withLayout(BooksPage);