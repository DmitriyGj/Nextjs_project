import {ISubBlockProps ,ILinkedSubBlockProps} from './SubBlock.props';
import style from './SubBlock.module.scss';
import Link from 'next/link';

export const SubBlock = ({title, content, orientation } : ISubBlockProps ) => {
    return (<div className={style.block}>
                <p>{title}:</p>
                {content?.some(item => !!item) &&
                    <ul className={orientation === 'horizontal'? style.horizontal : style.vertical}>
                        {content.map((item,index) => 
                            <li key={index} >{item}</li>)}
                    </ul>}
            </div>);
};

export const LinkedSubBlock = ({title, content, orientation, miniCardTypeEntriy}: ILinkedSubBlockProps) =>{
    return (<div className={style.block}>
        <p>{title}:</p>
        {content?.some(item => !!item) &&
            <ul className={orientation === 'horizontal'? style.horizontal : style.vertical}>
                {content.map(({id,name}) =>{ 
                    return <Link  key={id} 
                                href={`/${miniCardTypeEntriy}/${id}`}>
                        <a><li >{name || ' - '}</li></a>
                    </Link>}
                )}
            </ul>}
    </div>);
}