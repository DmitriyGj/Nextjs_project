import { HouseAPI, IHouse } from "../../public/src/services";

import { GetStaticProps } from "next";
import { HouseCard } from '../../public/src/components/HouseCard/HouseCard';
import Link from "next/link";
import { offset, createObserver, FetchStatus} from '../../public/src/constants';
import { useRef, useEffect,  LegacyRef} from 'react';
import { IHouseCardProps} from '../../public/src/components/HouseCard/HouseCard.props';
import { getHouses, getPage } from "../../public/src/selectors/houses";
import { useAppDispatch, useAppSelector } from "../../public/src/store/hooks";
import { incrementPage, setFetchStatus, setHouses } from "../../public/src/slices/houses";
import { AppDispach, wrapper } from "../../public/src/store/IceAndFireStore";

const HousesPage = ( ): JSX.Element => {
    const page: number = useAppSelector(getPage);
    const houses: IHouse[] = useAppSelector(getHouses);
    const loadTarget: LegacyRef<HTMLParagraphElement> = useRef(null);
    const dispatch: AppDispach = useAppDispatch();
    const {fetchStatus} = useAppSelector(state => state.houses);
    
    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () =>  {
                if(fetchStatus !== FetchStatus.Ended){
                    dispatch(incrementPage(null));
                }
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
            const newHouses = await HouseAPI.getMassiveData(page+1,offset);
            if(newHouses.length < offset){
                dispatch(setFetchStatus(FetchStatus.Ended));
            }
            dispatch(setHouses([...houses, ...newHouses]));
        }
        catch(e){
            console.log(e);
        }
    })();
    },[page]);

    return(<div>
                <h1>House&apos;s List</h1>
                <div>
                    {houses.map((card: IHouseCardProps) =>{ 
                        return (<Link href={`/houses/${card.id}`}key={`houses/${card.id}`}>
                                    <a><HouseCard {...card} /></a>
                                </Link>);}
                        )
                    }
                    <p ref={loadTarget}>More</p>
                </div>
        </div>);
            
};

export const  getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async (ctx) => {
    try{
        const {dispatch } = store;
    const {page} = store.getState().houses;
    const initHouses = await HouseAPI.getMassiveData(page,offset) || [];
    dispatch(setHouses(initHouses));
    return { props: { initHouses } };
    }
    catch(e){
        console.log(e);
        return { props: { initHouses: [] } };
    }
});

export default HousesPage;