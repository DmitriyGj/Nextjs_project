import { useDispatch, useSelector } from "react-redux";
import { getHousesStoreInfo, getHouseFullInfo } from "../../../public/src/selectors";

import { HouseBlock } from "../../../public/src/components/HouseBlock/HouseBlock";
import { Loader } from "../../../public/src/components/Loader/Loader";
import { fetchHouseInfo } from '../../../public/src/reducers'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FetchStatus } from "../../../public/src/constants";
import { withLayout } from "../../../public/src/HOC/Layout/Layout";

const CharacterPage = () =>{
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();
    const {fetchStatus} = useSelector(getHousesStoreInfo);
    const houseInfo= useSelector(getHouseFullInfo);

    useEffect(()=>{
        if(id){
            dispatch(fetchHouseInfo(id as string));
        }
    },[id]);

    return(
        <div>
            {fetchStatus === FetchStatus.Fulfilled && houseInfo && <HouseBlock {...houseInfo} />}
            {fetchStatus === FetchStatus.Pending && <Loader />}
            {fetchStatus === FetchStatus.Rejected && <p>Что-то пошло не так, не удалось получить информацию</p>}
        </div>
    );
};

export default withLayout(CharacterPage);