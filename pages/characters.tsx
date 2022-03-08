import { fetchCharacters, incrementPage } from "../public/src/reducers/CharactersReducer";
import { getCharacters, getCharactersStoreInfo } from "../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";
import { FetchStatus } from "../public/src/constants/FetchStatus";
import { createObserver } from "../public/src/constants/LoadObserver";
import { ChracterCard } from "../public/src/components/CharacterCard/CharacterCard";
import { IFetchParams } from "../public/src/ts";
import { InteractionObserverStandatrOptions } from "../public/src/constants";
import Link from "next/link";
import { Loader } from "../public/src/components/Loader/Loader";
import { withLayout } from "../public/src/HOC/Layout/Layout";
import { wrapper } from "../public/src/HOC/ReduxWeapper/ReduxWrapper";

const CharacterCardsPage = (): JSX.Element => {
    const characters = useSelector(getCharacters);
    const {page, offset, fetchStatus} = useSelector(getCharactersStoreInfo);
    const dispatch = useDispatch();
    const loadTarget = useRef(null);

    useEffect(()=>{     
        // const interactionHandle = (entries:IntersectionObserverEntry[]) => {
        //     entries.forEach(entrie => {
        //         if(fetchStatus !== FetchStatus.Pending && entrie.isIntersecting && entrie.intersectionRatio > 0.95){
        //             dispatch(incrementPage());
        //         }
        //     });
        // };
        // const observer = new IntersectionObserver(interactionHandle, InteractionObserverStandatrOptions);
        // if(loadTarget.current){
        //     observer.observe(loadTarget.current);
        // }
        const {current} = loadTarget; 
        const observer =  createObserver(fetchStatus !== FetchStatus.Pending, () => dispatch(incrementPage()));
        if(current){
            observer.observe(current);
        }

        return() =>{ 
            if(current){
                observer.unobserve(current);
            }
    };  },[loadTarget.current, fetchStatus]);

    useEffect(()=>{
        const fetchParams = {page, offset} as IFetchParams;
        dispatch(fetchCharacters(fetchParams));
    },[page]);

    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {characters && characters.map(card =>{ 
                        return (<Link href={`/characters/${card.id}`} key={`characters/${card.id}`}>
                                    <a><ChracterCard  {...card} /></a>
                                </Link>);}
                            )
                    }
                </div>
                    {fetchStatus === FetchStatus.Pending ? <Loader /> : <p ref={loadTarget}>More</p>}
        </div>);
            
};

CharacterCardsPage.getInitialPageProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() => {
        return await dispatch(fetchCharacters({page:1,offset:10}));
    }
);

export default withLayout(CharacterCardsPage);