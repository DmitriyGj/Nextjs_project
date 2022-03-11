import { HouseAPI, IHouse } from "../../public/src/services";

import { GetStaticProps } from "next";
import {HouseCard} from '../../public/src/components/HouseCard/HouseCard';
import Link from "next/link";
import { initPage, offset, createObserver} from '../../public/src/constants';
import { useState, useRef, useEffect} from 'react';
import { IHouseCardProps} from '../../public/src/components/HouseCard/HouseCard.props';

interface HousesPageProps extends Record<string,unknown> {
    houses: IHouse[]
}

const HousesPage = ({ houses } : HousesPageProps): JSX.Element => {

    const stateInitPage = initPage+1;
    const [page, setPage] = useState<number>(stateInitPage);
    const [fetchedCards, setFetchedCards] = useState<IHouseCardProps[]>(houses);
    const loadTarget = useRef(null);

    useEffect(() =>{
        (async() => {
            const newCards = await HouseAPI.getMassiveData(page,offset);
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
                <h1>House&apos;s List</h1>
                <div>
                    {fetchedCards?.map(card =>{ 
                        return (<Link href={`/houses/${card.id}`}key={`houses/${card.id}`}>
                                    <a><HouseCard {...card} /></a>
                                </Link>);}
                        )
                    }
                    <p ref={loadTarget}>More</p>
                </div>
        </div>);
            
};

export const  getStaticProps: GetStaticProps<HousesPageProps> = async (ctx) => {
    const res = await HouseAPI.getMassiveData(1,10);
    return {
        props: {
            houses:res
        }
    };
} ;

export default HousesPage;