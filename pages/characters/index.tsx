import { CharacterAPI, ICharacter } from "../../public/src/services";

import { ChracterCard } from "../../public/src/components/CharacterCard/CharacterCard";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRef, useState, useEffect } from 'react';
import { ICharacterCardProps  } from '../../public/src/components/CharacterCard/ChracterCard.props';
import { initPage ,offset, createObserver } from '../../public/src/constants';
interface ICharacterPageProps extends Record<string,unknown> {
    characters: ICharacter[]
}

const CharacterCardsPage = ({characters} : ICharacterPageProps ): JSX.Element => {
    const stateInitPage = initPage+1;
    const [page, setPage] = useState<number>(stateInitPage);
    const [fetchedCards, setFetchedCards] = useState<ICharacterCardProps[]>(characters);
    const loadTarget = useRef(null);

    useEffect(() =>{
        (async() => {
            const newCards = await CharacterAPI.getMassiveData(page,offset);
            setFetchedCards([...fetchedCards,...newCards]);
        })();
    }, 
    [page]);

    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () => {setPage(page+1);});
        if(current){
            observer.observe(current);
        }

        return() =>{
            if(current){
                observer.unobserve(current);
            }
        };
    });
    
    return(<div>
                <h1>Chraracter&apos;s List</h1>
                <div>
                    {fetchedCards?.map(card =>{ 
                        return (<Link href={`/characters/${card.id}`} key={`characters/${card.id}`}>
                                    <a><ChracterCard  {...card} /></a>
                                </Link>);}
                            )
                    }
                    <p ref={loadTarget}>More</p>
                </div>
        </div>);
            
};


export const  getServerSideProps: GetStaticProps<ICharacterPageProps> = async (ctx) => {
    const res = await CharacterAPI.getMassiveData(initPage,offset);
    return {
        props: {
            characters:res
        }
    };
}; 

export default CharacterCardsPage;