import {IBookCardProps} from './BookCard.props';
import style from './BookCard.module.scss';
import {v4 as uuid} from 'uuid';

export const BookCard = ({name,authors}: IBookCardProps) => {
    return(<div className = {style.BookCard}>
            <p>Name: {name}</p>
            <div>
                <p>Authors: </p>
                <ul>
                    {authors.map((author) => <li key = {uuid()}>{author}</li>)}
                </ul>                    
            </div>
        </div>)
}