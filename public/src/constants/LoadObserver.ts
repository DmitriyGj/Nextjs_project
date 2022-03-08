import { InteractionObserverStandatrOptions } from "./InteractionObserver";
import { Dispatch } from "react";
import { Action } from "@reduxjs/toolkit";

export interface observerProps{
    flag:boolean
    handler: {payload:undefined, type:string}
}

export const createObserver = (flag: boolean, handler: () => void)=>{
    const interactionHandle = (entries:IntersectionObserverEntry[]) => {
        entries.forEach(entrie => {
            if(flag && entrie.isIntersecting && entrie.intersectionRatio > 0.95){
                handler();
            }
        });
    };
    const observer = new IntersectionObserver(interactionHandle, InteractionObserverStandatrOptions);

    return observer;
}