import {IBookCardProps} from './BookCard.props';
import style from './BookCard.module.scss';

export const BookCard = ({name,authors}: IBookCardProps) => {
    return(<div className={style.BookCard}>
            <p>Name: {name}</p>
            <div>
                <p>Authors: </p>
                <ul>
                    {authors.map((author,index) => <li key={index}>{author}</li>)}
                </ul>                    
            </div>
        </div>);
};