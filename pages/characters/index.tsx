import { ChracterCard } from "../../public/src/components/CharacterCard/CharacterCard";
import { GetStaticProps} from "next";
import Link from "next/link";
import { useRef, useEffect, LegacyRef } from 'react';
import { createObserver, FetchStatus } from '../../public/src/constants';
import { AppDispach, wrapper } from "../../public/src/store/IceAndFireStore";
import { clearCharacters, fetchCharacters, incrementPage } from "../../public/src/slices/characters";
import { useDispatch } from "react-redux";
import { ICharacterCardProps } from "../../public/src/components/CharacterCard/ChracterCard.props";
import { useAppSelector } from "../../public/src/store/hooks";
import { getCharacters, getPage } from "../../public/src/selectors/characters";

const CharacterCardsPage = ( ): JSX.Element => {
    const characters = useAppSelector(getCharacters);
    const page: number = useAppSelector(getPage);
    const {fetchStatus} = useAppSelector(state => state.characters);
    const loadTarget: LegacyRef<HTMLParagraphElement> = useRef(null);
    const dispatch: AppDispach = useDispatch();

    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () =>  {
                dispatch(incrementPage(null));
        });

        if(current){
            observer.observe(current);
        }

        if(fetchStatus === FetchStatus.Ended && current){
            observer.unobserve(current);
        }

        return() =>{
            if(current){
                observer.unobserve(current);
            }
        };
    });

    useEffect(() => { ( async () => {
        try{
            dispatch(fetchCharacters(page));
        }
        catch(e){
            console.log(e);
        }
    })();
    },[page]);
    
    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {characters.map((card: ICharacterCardProps )=>{ 
                        return (<Link href={`/characters/${card.id}`} key={`characters/${card.id}`}>
                                    <a><ChracterCard  {...card} /></a>
                                </Link>);}
                            )
                    }
                    <p ref={loadTarget}>{fetchStatus === FetchStatus.Ended ? 'It\'s all' : 'More'}</p>
                </div>
        </div>);
            
};

export const  getStaticProps: GetStaticProps = wrapper.getStaticProps(
    (store) => async () => {
        try{
            store.dispatch(clearCharacters(null));
            const {page} = store.getState().characters;
            store.dispatch(fetchCharacters(page));
            return { props: { initCharacters: [] } };
        }
        catch(e){
            return { props: { initCharacters: [] } };
        }
    }
);

export default CharacterCardsPage;