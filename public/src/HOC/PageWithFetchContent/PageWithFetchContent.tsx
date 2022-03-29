import { useEffect, useRef, useState } from 'react';

import Link from "next/link";
import { RootState } from '../../store/IceAndFireStore';
import { createObserver, FetchStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICard } from '../../ts';
import { useRouter } from 'next/router';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import style from './PageWithFetchContent.module.scss';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { FiltersBlock } from '../../components/FiltersBlock/FiltersBlock';
import { selectorsByDirectory } from '../../selectors/filters';
import { setFiltersByDirectory } from '../../slices';
import { IFilter } from '../../ts/IFetchParams.model';
export interface IWithContentPageProps {
    title: string
    getPage: (state: RootState) => number
    getFetchStatus: (state: RootState) => FetchStatus
    getContent: (state: RootState) => ICard []
    clearContent: ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
    incrementPage:  ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
    fetchContent: AsyncThunk<any[], any, {}> 
    ContentCard: (props:any) => JSX.Element,
};

export const PageWithFetchContent = ({title,
                                    getPage,
                                    getContent,
                                    clearContent,
                                    getFetchStatus,
                                    incrementPage,
                                    fetchContent,
                                    ContentCard}:
        IWithContentPageProps ) => { 
    const cards = useAppSelector(getContent);
    const fetchStatus = useAppSelector(getFetchStatus);
    const page: number = useAppSelector(getPage);
    const loadTarget = useRef(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const filter = useAppSelector(selectorsByDirectory[router.pathname]);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const { current } = loadTarget;
        const observer = createObserver(true, () =>  {
                if(fetchStatus === FetchStatus.Fulfilled){
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
            console.log(filter);
            dispatch(fetchContent({page,filter}));
        }
        catch(e){
            console.log(e);
        }

    })();
    },[page]);

    useEffect(() => {
        dispatch(clearContent(null));
        dispatch(fetchContent({page,filter}));
    },[filter]);

    return(<div className={style.PageContent}>
                <div className={style.CardsBlock}>
                    <h1>{title}</h1>

                    <div>
                        {cards.map(card => { 
                            return (<Link href={`${router.pathname}/${card.id}`} key={`${router.pathname}/${card.id}`}>
                                        <a><ContentCard {...card} /></a>
                                    </Link>);}) 
                        }
                        <p ref={loadTarget}>{fetchStatus === FetchStatus.Ended ?'It\'s all' : 'More' }</p>
                    </div>
                </div>
                <span onClick={() => setShowModal(true)}
                                className={style.Shower}>Filters</span>
                {showModal && <ModalWindow visible={showModal}
                                        title='Фильтр' 
                                        onClose={()=>setShowModal(false)}>

                        <FiltersBlock filterValue={filter} 
                                    clickApplyHandler={()=>setShowModal(false)}
                                    setFilterFunction={setFiltersByDirectory[router.pathname]} 
                                    selectorFunction={selectorsByDirectory[router.pathname]} />
                    </ModalWindow>}
            </div>);
};
