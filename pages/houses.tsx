import { fetchHouses, incrementPage } from "../public/src/reducers/HousesReducer";
import { getHouses, getHousesStoreInfo } from "../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";

import {HouseCard} from '../public/src/components/HouseCard/HouseCard';
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { withLayout } from "../public/src/HOC/Layout/Layout";
import { wrapper } from "../public/src/HOC/ReduxWeapper/ReduxWrapper";
import { FetchStatus } from "../public/src/constants/FetchStatus";

const HousesPage = (): JSX.Element => {
    const houses = useSelector(getHouses);
    const {page, offset, fetchStatus} = useSelector(getHousesStoreInfo);
    const dispatch = useDispatch();
    const loadTarget = useRef(null);

    useEffect(()=>{     
        const interactionHandle = (entries:IntersectionObserverEntry[]) => {
            entries.forEach(entrie => {
                if(fetchStatus !== FetchStatus.Pending && entrie.isIntersecting && entrie.intersectionRatio > 0.95){
                    dispatch(incrementPage());
                }
            });
        };
        const observer = new IntersectionObserver(interactionHandle, InteractionObserverStandatrOptions);
        if(loadTarget.current){
            observer.observe(loadTarget.current);
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

HousesPage.getInitialPageProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() => {
        return await dispatch(fetchHouses({page:1,offset:10}));
    }
);

export default withLayout(HousesPage);