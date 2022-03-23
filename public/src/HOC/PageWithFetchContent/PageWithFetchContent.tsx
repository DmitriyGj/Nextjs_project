import { Component, FC, Props, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

import Link from "next/link";
import { RootState } from '../../store/IceAndFireStore';
import { createObserver, FetchStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICard } from '../../ts';
import { useRouter } from 'next/router';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { IFilter } from '../../ts/IFetchParams.model';
import style from './PageWithFetchContent.module.scss';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Portal } from '../Portal/Portal';

export interface IWithContentPageProps {
    title: string
    getPage: (state: RootState) => number
    getFetchStatus: (state: RootState) => FetchStatus
    getContent: (state: RootState) => ICard []
    incrementPage:  ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
    fetchContent: AsyncThunk<any[], number, {}>
    ContentCard: (props:any) => JSX.Element,
    getFilter: (state: RootState) => IFilter,
    setFilter: (state: RootState) => ActionCreatorWithPayload<any,any>
};

export const PageWithFetchContent = ({title,
                                    getPage,
                                    getContent,
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
            dispatch(fetchContent(page));
        }
        catch(e){
            console.log(e);
        }

    })();
    },[page]);

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
                {showModal && <ModalWindow visible={showModal} title='Фильтр' onClose={()=>setShowModal(false)}>ssss</ModalWindow>}
            </div>);
};
