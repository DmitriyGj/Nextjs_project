import { Component, FC, Props, ReactElement, ReactNode, useEffect, useRef } from 'react';

import Link from "next/link";
import { RootState } from '../../store/IceAndFireStore';
import { createObserver, FetchStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICard } from '../../ts';
import { useRouter } from 'next/router';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';

export interface IWithContentPageProps {
    title: string
    getPage: (state: RootState) => number
    getFetchStatus: (state: RootState) => FetchStatus
    getContent: (state: RootState) => ICard []
    incrementPage:  ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
    fetchContent: AsyncThunk<any[], number, {}>
    ContentCard: (props:any) => JSX.Element
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

    return(<div>
            <h1>{title}</h1>
                <div>
                {cards.map(card => { 
                    return (<Link href={`${router.pathname}/${card.id}`} key={`books/${card.id}`}>
                                <a><ContentCard {...card} /></a>
                            </Link>);}) 
                }
                <p ref={loadTarget}>{fetchStatus === FetchStatus.Ended ?'It\'s all' : 'More' }</p>
                </div>
            </div>);
};

PageWithFetchContent.getStaticProps = 'Здесь код со скрина';
