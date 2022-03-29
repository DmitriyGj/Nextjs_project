import { DetailedHTMLProps, HTMLAttributes, ReactElement, useRef } from "react";
import style from './LabledInput.module.scss';
import cn from 'classnames';

interface LabledInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    label: string
    value: any
    type: 'date' | 'checkbox' | 'text'
    orientation?: 'vertical' | 'horizontal'
}


export const LabledInput = ({label, type,orientation = 'vertical',value, onChange, className} : LabledInputProps ) => {

    return(<div className={cn(style.LabledInput, style[orientation],className)}>
        <label htmlFor={label}>{label.toString()}</label>
        {type === 'checkbox'  ?
            <input type='checkbox' checked={!!value} id={label} />
            : <input onChange={onChange} type={type} value={value} id={label} />}
    </div>
    );
};