import {ISubBlockProps} from './SubBlock.props';
import {v4 as uuid} from 'uuid';

export const SubBlock = ({title, content } : ISubBlockProps ) => {
    return (<div>
                <p>{title}:</p>
                <ul>
                    {content.map(item => <li key ={uuid()} >{item}</li>)}
                </ul>
            </div>)
}