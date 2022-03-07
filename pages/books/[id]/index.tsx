import { getBookFullInfo, getBooksStoreInfo } from "../../../public/src/selectors";
import { useDispatch, useSelector } from "react-redux";

import { BookBlock } from "../../../public/src/components/BookBlock/BookBlock";
import { Loader } from "../../../public/src/components/Loader/Loader";
import { fetchBookInfo } from "../../../public/src/reducers/BooksReducer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { withLayout } from "../../../public/src/HOC/Layout/Layout";

const BookPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();
    const {fetchStatus} = useSelector(getBooksStoreInfo);
    const characterInfo = useSelector(getBookFullInfo);
    
    useEffect(()=>{
        if(id){
            dispatch(fetchBookInfo(id as string));
        }
    },[id])
    
    return(<div>
            {fetchStatus === 'fulfilled' && characterInfo && <BookBlock {...characterInfo} />}
            {fetchStatus === 'pending' && <Loader/>}
            {fetchStatus === 'rejected' && <p>Что-то пошло не так, не удалось получить информацию</p>}
        </div>)
}

export default withLayout(BookPage);

