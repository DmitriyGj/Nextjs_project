import { getHouseFullInfo, getHousesStoreInfo } from "../../../public/src/selectors";
import { useDispatch, useSelector } from "react-redux";

import { FetchStatus } from "../../../public/src/constants";
import { HouseBlock } from "../../../public/src/components/HouseBlock/HouseBlock";
import { Loader } from "../../../public/src/components/Loader/Loader";
import { fetchHouseInfo } from '../../../public/src/reducers'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { withLayout } from "../../../public/src/HOC/Layout/Layout";
import { wrapper } from "../../../public/src/HOC/ReduxWeapper/ReduxWrapper";

const HousePage = () =>{
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();
    const {fetchStatus} = useSelector(getHousesStoreInfo);
    const houseInfo= useSelector(getHouseFullInfo);

    useEffect(()=>{
        if(!id){
            return;
        }
        dispatch(fetchHouseInfo(id as string));
    },[id]);

    return(
        <div>
            {fetchStatus === FetchStatus.Fulfilled && houseInfo && <HouseBlock {...houseInfo} />}
            {fetchStatus === FetchStatus.Pending && <Loader />}
            {fetchStatus === FetchStatus.Rejected && <p>Что-то пошло не так, не удалось получить информацию</p>}
        </div>
    );
};

HousePage.getInititalProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() =>{
        const router = useRouter();
        const {id} = router.query;
        await dispatch(fetchHouseInfo(id?.toString() || '1'));
    }
);

export default withLayout(HousePage);