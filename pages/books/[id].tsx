import { BookAPI } from "../../public/src/services";
import { BookBlock } from "../../public/src/components/BookBlock/BookBlock";
import { GetServerSideProps } from "next";
import { IBookFullInfo } from "../../public/src/ts";
import { withLayout } from "../../public/src/HOC/Layout/Layout";

interface BookPageProps extends Record<string, unknown> {
    bookInfo: IBookFullInfo 
}

const BookPage = ({bookInfo} : BookPageProps) => {

    return(<div>
            <BookBlock {...bookInfo} />
        </div>);
};

export const getServerSideProps: GetServerSideProps = async ({query}) =>{
    try{
        const {id} = query;
        if(!id){
            return { props: {}};
        }
        const book = await BookAPI.getFullData(id?.toString());
        return {
            props: {
                bookInfo: book
            }
        };
    }
    catch(e){
        throw new Error('ошибка в gssp');
        return {
            props: {}
        };
    }
};


export default BookPage;

// async (ctx) => {
//     const { id } = ctx.query;
//     if(!id ){
//         return {props:{ bookInfo: {}}};
//     }
//     const bookInfo = await BookAPI.getFullData(id.toString());
//     return {props: { bookInfo } };
// };