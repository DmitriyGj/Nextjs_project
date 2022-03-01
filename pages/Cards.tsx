import { fetchCharacters, incrementPage } from "../public/src/reducers/CharactersReducer";
import { getCharacters, getCharactersStoreInfo } from "../public/src/selectors/charactersSelectors";
import {useDispatch, useSelector} from "react-redux";

import { ChracterCard } from "../public/src/components/CharacterCard/CharacterCard";
import { IFetchParams } from "../public/src/ts/Slice.model";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { useEffect } from "react";

const CardsPage = (): JSX.Element => {
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
        const isNearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight;
        if(isNearBottom){
            dispatch(incrementPage());
        }
    };

    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {characters.map((card, index) =>{ 
                        return (<Link href={`/characters/card/${card.id}`} key = {index}>
                                    <a>< ChracterCard key = {index} {...card} / ></a>
                                </Link>)})
                    }
                </div>
                    {fetchStatus === 'pending' ? <Loader/> : <p>More</p>}
        </div>)
            
}

export default CardsPage;