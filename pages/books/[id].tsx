import { BookBlock } from "../../public/src/components/BookBlock/BookBlock";
import { GetServerSideProps } from "next";
import { wrapper } from "../../public/src/store/IceAndFireStore";
import { setCurrentBook } from '../../public/src/slices/books';
import { getCurrentBook } from "../../public/src/selectors/books";
import { useAppSelector } from "../../public/src/store/hooks";
import { fetchBook } from "../../public/src/slices/books";

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
            const res = (await store.dispatch(fetchBook(id))).payload; 
            if(!res){
                return { notFound: true };
            }
        }
        catch(e){
            console.log(e);
            store.dispatch(setCurrentBook(null));
            return { notFound: true };
        }
        finally{
            return { props: { } };
        }
    });

export default BookPage;