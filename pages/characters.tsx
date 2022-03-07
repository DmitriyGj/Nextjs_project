import { fetchCharacters, incrementPage } from "../public/src/reducers/CharactersReducer";
import { getCharacters, getCharactersStoreInfo } from "../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";

import { ChracterCard } from "../public/src/components/CharacterCard/CharacterCard";
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import {v4 as uuid} from 'uuid';
import { withLayout } from "../public/src/HOC/Layout/Layout";

const CharacterCardsPage = (): JSX.Element => {
    const characters = useSelector(getCharacters);
    const {page, offset, fetchStatus} = useSelector(getCharactersStoreInfo);
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
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {characters && characters.map(card =>{ 
                        return (<Link href={`/characters/${card.id}`} key = {uuid()}>
                                    <a>< ChracterCard  {...card} / ></a>
                                </Link>)})
                    }
                </div>
                    {fetchStatus === 'pending' ? <Loader/> : <p ref = {loadTarget}>More</p>}
        </div>)
            
}

export default withLayout(CharacterCardsPage);