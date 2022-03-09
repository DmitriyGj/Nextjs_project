import { CharacterAPI, ICharacter } from "../../public/src/services";
import { fetchCharacters, incrementPage } from "../../public/src/reducers/CharactersReducer";
import { getCharacters, getCharactersStoreInfo } from "../../public/src/selectors";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef } from "react";

import { ChracterCard } from "../../public/src/components/CharacterCard/CharacterCard";
import { FetchStatus } from "../../public/src/constants/FetchStatus";
import { GetServerSideProps } from "next";
import { IFetchParams } from "../../public/src/ts";
import Link from "next/link";
import { Loader } from "../../public/src/components/Loader/Loader";
import { createObserver } from "../../public/src/constants/LoadObserver";
import { withLayout } from "../../public/src/HOC/Layout/Layout";
import { wrapper } from "../../public/src/HOC/ReduxWeapper/ReduxWrapper";

interface ICharacterPageProps extends Record<string,unknown> {
    characters: ICharacter[]
}

const CharacterCardsPage = ({characters} : ICharacterPageProps ): JSX.Element => {
    const newCharacters = useSelector(getCharacters);
    const {page, offset, fetchStatus} = useSelector(getCharactersStoreInfo);
    const dispatch = useDispatch();
    const loadTarget = useRef(null);

    useEffect(()=>{     
        const {current} = loadTarget; 
        const observer =  createObserver(fetchStatus !== FetchStatus.Pending, () => dispatch(incrementPage()));
        if(current){
            observer.observe(current);
        }

        return() =>{ 
            if(current){
                observer.unobserve(current);
            }
        };  
    },[loadTarget.current, fetchStatus]);

    useEffect(()=>{
        const fetchParams:  IFetchParams = {page, offset};
        dispatch(fetchCharacters(fetchParams));
    },[page]);

    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {(newCharacters.length > characters.length ? newCharacters: characters)?.map(card =>{ 
                        return (<Link href={`/characters/${card.id}`} key={`characters/${card.id}page=${page}`}>
                                    <a><ChracterCard  {...card} /></a>
                                </Link>);}
                            )
                    }
                </div>
                    {fetchStatus === FetchStatus.Pending ? <Loader /> : <p ref={loadTarget}>More</p>}
        </div>);
            
};

CharacterCardsPage.getInitialProps = wrapper.getInitialPageProps(
    ({dispatch}) => async () => {
        return await dispatch(fetchCharacters({ page:1,offset:10 }));
    }
);

export const  getServerSideProps: GetServerSideProps<ICharacterPageProps> = async (ctx) => {
    const res = await CharacterAPI.getMassiveData(1,10);
    return {
        props: {
            characters:res
        }
    };
}; 

export default withLayout(CharacterCardsPage);