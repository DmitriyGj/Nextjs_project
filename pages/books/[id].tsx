import { BookAPI } from "../../public/src/services";
import { BookBlock } from "../../public/src/components/BookBlock/BookBlock";
import { GetServerSideProps } from "next";
import { wrapper } from "../../public/src/store/IceAndFireStore";
import { setCurrentBook } from '../../public/src/slices/books';
import { getCurrentBook } from "../../public/src/selectors/books";
import { useAppSelector } from "../../public/src/store/hooks";

const BookPage = ( ) => {
    const bookInfo = useAppSelector(getCurrentBook);

    return(<div>
            <BookBlock {...bookInfo} />
        </div>);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        try{
            const id = ctx.query.id as string;
            if(!id){
                return { notFound: true };
            }

            const bookInfo = await BookAPI.getFullData(id as string);
            if(!bookInfo){
                return { notFound: true };
            }
            
            store.dispatch(setCurrentBook(bookInfo));
            return { props: { bookInfo } };
        }
        catch(e){
            console.log(e);
            store.dispatch(setCurrentBook(null));
            return { notFound: true };
        }
    });

export default BookPage;