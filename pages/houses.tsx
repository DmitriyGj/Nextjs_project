import { fetchCharacters, incrementPage } from "../public/src/reducers/CharactersReducer";
import { getHouses, getHousesStoreInfo } from "../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";

import {HouseCard} from '../public/src/components/HouseCard/HouseCard';
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import {v4 as uuid} from 'uuid';
import { withLayout } from "../public/src/HOC/Layout/Layout";

const HousesPage = (): JSX.Element => {
    const houses = useSelector(getHouses);
    const {page, offset, fetchStatus} = useSelector(getHousesStoreInfo);
    const dispatch = useDispatch();
    const loadTarget = useRef(null);

    useEffect(()=>{     
        const interactionHandle = (entries:IntersectionObserverEntry[]) => {
            entries.forEach(entrie => {
                if(fetchStatus !== 'pending' && entrie.isIntersecting && entrie.intersectionRatio > 0.95){
                    dispatch(incrementPage())
                }
            })
        }
        const observer = new IntersectionObserver(interactionHandle, InteractionObserverStandatrOptions)
        if(loadTarget.current){
            observer.observe(loadTarget.current)
        }
        return() =>{ 
            if(loadTarget.current){
                observer.unobserve(loadTarget.current);
            }
}    },[loadTarget.current]);

    useEffect(()=>{
        const fetchParams = {page, offset} as IFetchParams
        dispatch(fetchCharacters(fetchParams));
    },[page]);



    return(<div>
                <h1>House&apos;s List</h1>
                <div>
                    {houses && houses.map(card =>{ 
                        return (<Link href={`/houses/${card.id}`} key = {uuid()}>
                                    <a>< HouseCard  {...card} / ></a>
                                </Link>)})
                    }
                </div>
                    {fetchStatus === 'pending' ? <Loader/> : <p ref = {loadTarget}>More</p>}
        </div>)
            
}

export default withLayout(HousesPage);