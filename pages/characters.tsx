import { fetchCharacters, incrementPage } from "../public/src/reducers/CharactersReducer";
import { getCharacters, getCharactersStoreInfo } from "../public/src/selectors/charactersSelectors";
import {useDispatch, useSelector} from "react-redux";

import { ChracterCard } from "../public/src/components/CharacterCard/CharacterCard";
import { IFetchParams } from "../public/src/ts";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { useEffect } from "react";
import { withLayout } from "../public/src/HOC/Layout/Layout";

const CharacterCardsPage = (): JSX.Element => {
    const characters = useSelector(getCharacters);
    const {page, offset, fetchStatus} = useSelector(getCharactersStoreInfo);
    const dispatch = useDispatch();

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return() => window.removeEventListener('scroll',handleScroll);
    })

    useEffect(()=>{
        const fetchParams = {page, offset} as IFetchParams
        dispatch(fetchCharacters(fetchParams));
    },[page])

    const handleScroll = (e: Event) => {
        const isNearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight + 380;
        if(isNearBottom){
            if(fetchStatus !== 'pending'){
                dispatch(incrementPage());
            }
        }
    };

    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {characters && characters.map(card =>{ 
                        return (<Link href={`/characters/${card.id}`} key = {card.id}>
                                    <a>< ChracterCard  {...card} / ></a>
                                </Link>)})
                    }
                </div>
                    {fetchStatus === 'pending' ? <Loader/> : <p>More</p>}
        </div>)
            
}

export default withLayout(CharacterCardsPage);