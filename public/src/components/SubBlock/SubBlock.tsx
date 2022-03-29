import {ILinkedSubBlockProps, ISubBlockProps} from './SubBlock.props';

import { NavLink } from '../NavLink/NavLink';
import style from './SubBlock.module.scss';
import { Orientation } from '../../constants';

export const SubBlock = ({title, content, orientation = Orientation.vertical } : ISubBlockProps ) => {
    return (<div className={style.block}>
                <p>{title}:</p>
                {content?.some(item => !!item) &&
                    <ul className={style[orientation] }>
                        {content.map((item,index) => 
                            <li key={index} >{item}</li>)}
                    </ul>}
            </div>);
};

export const LinkedSubBlock = ({title, content, orientation, miniCardTypeEntriy}: ILinkedSubBlockProps) =>{
    return (<div className={style.block}>
        <p>{title}:</p>
        {content?.some(item => !!item) &&
            <ul className={style[`${orientation}`]}>
                {content.map(({ id, name }) => (<li key={ id } >
                                                    <NavLink 
                                                        href={ `/${miniCardTypeEntriy}/${id}` } passHref>
                                                            { name || ' - ' }
                                                    </NavLink>
                                                </li>))
                }
            </ul>
        }
    </div>);
};