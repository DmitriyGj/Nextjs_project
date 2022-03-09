import { GetStaticPaths, GetStaticProps } from "next";

import { BookAPI } from "../../public/src/services";
import { BookBlock } from "../../public/src/components/BookBlock/BookBlock";
import { FetchStatus } from "../../public/src/constants";
import { IBookFullInfo } from "../../public/src/ts";
import { Loader } from "../../public/src/components/Loader/Loader";
import dynamic from "next/dynamic";
import {getBooksStoreInfo} from '../../public/src/selectors'
import { useSelector } from "react-redux";
import { withLayout } from "../../public/src/HOC/Layout/Layout";

interface BookPageProps extends Record<string, unknown> {
    bookInfo: IBookFullInfo
}

const BookPage = ({bookInfo} : BookPageProps) => {

    const {fetchStatus} = useSelector(getBooksStoreInfo);

    return(<div>

            <BookBlock {...bookInfo} />
        </div>);
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await BookAPI.getMassiveData(1,10);
    const paths =  res.map((book) => ({params:{id: book.id }}));
    return {paths, fallback:false};
};

export const getStaticProps: GetStaticProps = async ({params}) =>{
    const bookInfo = await BookAPI.getFullData(params?.id?.toString() || '1');
    return {props: { bookInfo }}
}

export default withLayout(BookPage);

