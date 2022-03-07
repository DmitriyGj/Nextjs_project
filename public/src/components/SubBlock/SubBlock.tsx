import {ISubBlockProps} from './SubBlock.props';
import style from './SubBlock.module.scss'
import {v4 as uuid} from 'uuid';

export const SubBlock = ({title, content, orientation } : ISubBlockProps ) => {
    return (<div className={style.block}>
                <p>{title}:</p>
                {content?.some(item => !!item) &&
                    <ul className={orientation === 'horizontal'? style.horizontal : style.vertical}>
                        {content.map((item, index) => 
                            <li key ={uuid()} >{item}{orientation === 'horizontal' && 
                                                    index !== content.length-1  && 
                                                        ', '}</li>)}
                    </ul>}
            </div>)
}