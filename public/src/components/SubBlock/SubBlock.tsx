import {ISubBlockProps} from './SubBlock.props';
import style from './SubBlock.module.scss'
import {v4 as uuid} from 'uuid';

export const SubBlock = ({title, content } : ISubBlockProps ) => {
    return (<div className={style.block}>
                <p>{title}:</p>
                { content && content.some(item => !!item) &&
                <ul className='content'>
                    {content.map(item => <li key ={uuid()} >{item}</li>)}
                </ul>}
            </div>)
}