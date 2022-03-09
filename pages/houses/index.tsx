import { HouseAPI, IHouse } from "../../public/src/services";
import { fetchHouses, incrementPage } from "../../public/src/reducers/HousesReducer";
import { getHouses, getHousesStoreInfo } from "../../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";

import { FetchStatus } from "../../public/src/constants/FetchStatus";
import { GetServerSideProps } from "next";
import {HouseCard} from '../../public/src/components/HouseCard/HouseCard';
import { IFetchParams } from "../../public/src/ts";
import Link from "next/link";
import { Loader } from "../../public/src/components/Loader/Loader";
import { createObserver } from "../../public/src/constants/LoadObserver";
import { withLayout } from "../../public/src/HOC/Layout/Layout";
import { wrapper } from "../../public/src/HOC/ReduxWeapper/ReduxWrapper";

interface HousesPageProps{
    houses: IHouse[]
}

const HousesPage = (): JSX.Element => {
    const houses = useSelector(getHouses);
    const {page, offset, fetchStatus} = useSelector(getHousesStoreInfo);
    const dispatch = useDispatch();
    const loadTarget = useRef(null);

    useEffect(()=>{     
        const observer = createObserver(fetchStatus !== FetchStatus.Pending, () => dispatch(incrementPage()));

        if(loadTarget.current){
            observer.observe(loadTarget.current);
        }
        
        if(fetchStatus === FetchStatus.Ended && loadTarget.current){
            observer.unobserve(loadTarget.current)
        }

        return() =>{ 
            if(loadTarget.current){
                observer.unobserve(loadTarget.current);
            }
        };    
    },[loadTarget.current]);

    useEffect(()=>{
        const fetchParams: IFetchParams = {page, offset};
        dispatch(fetchHouses(fetchParams));
    },[page]);

    return(<div>
                <h1>House&apos;s List</h1>
                <div>
                    {houses && houses.map(card =>{ 
                        return (<Link href={`/houses/${card.id}`}key={`houses/${card.id}`}>
                                    <a><HouseCard {...card} /></a>
                                </Link>);}
                        )
                    }
                </div>
                    {fetchStatus === FetchStatus.Pending ? <Loader /> : <p ref={loadTarget}>More</p>}
        </div>);
            
};

HousesPage.getInitialProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() => {
        await dispatch(fetchHouses({page:1,offset:10}));
    }
);

export const  getServerSideProps: GetServerSideProps<HousesPageProps> = async (ctx) => {
    const res = await HouseAPI.getMassiveData(1,10);
    return {
        props: {
            houses:res
        }
    }
} 

export default withLayout(HousesPage);