import React, {  useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LabledInput } from "../LabledInput/LabledInput";
import {FilterField} from '../../ts';
import { FilterBlockProps } from "./FIlterBlock.props";
import { IFilter } from "../../ts/IFetchParams.model";


export const FiltersBlock = ({filterValue, setFilterFunction, clickApplyHandler}: FilterBlockProps ) => {
    const [currentFilterValue, setCurrentFilterValue] =  useState<IFilter>(filterValue);
    const ref = useRef<FilterField[]>();
    const [render, setRender] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    
    const onChangeHandler = ({currentTarget}: React.KeyboardEvent<HTMLInputElement>) => {
        const {id,value} = currentTarget;
        const newFilterValue = {...currentFilterValue, [id]:{...currentFilterValue[id],value:value}};
        setCurrentFilterValue(newFilterValue);
    };

    useEffect(() => {
        ref.current = [];
        for(var prop in currentFilterValue){
            if(!prop.includes('_')) {
                ref.current?.push({name:prop, value:currentFilterValue[prop].value,type:currentFilterValue[prop].type} as FilterField);
            }
        };

        setRender(ref.current.length !== 0);        
        return()=>{
            ref.current =[];
        };
        
    },[render, setRender]);


    return(<div>
        {
            render && ref.current?.map(({name,type},index) =>{
                return (!name.includes('_') && 
                                        <LabledInput onChange={onChangeHandler}
                                            type={type}
                                            key={index}
                                            label={name} 
                                            value={currentFilterValue[name].value} />);
                                        }
            )
        }
        <button onClick={() => {
            dispatch(setFilterFunction(currentFilterValue));
            clickApplyHandler();
        }}>Apply</button>
        <button>Cancel</button>
    </div>);
};