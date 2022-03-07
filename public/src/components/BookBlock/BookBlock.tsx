import { IBookBlockProps } from "./BookBlock.props";
import { SubBlock } from "../SubBlock/SubBlock";
import style from './BookBlock.module.scss'

export const BookBlock = ({name,
                        authors,
                        isbn, 
                        numberOfPages,
                        publisher,
                        country,
                        mediaType,
                        released, 
                        characters, 
                        povCharacters}: IBookBlockProps) => {
    return(
        <div className={style.main}>
            <p>Name: {name}</p>
            <p>ISBN: {isbn}</p>
            <p>Country: {country}</p>
            <p>Media type: {mediaType}</p>
            <p>Number of pages: {numberOfPages}</p>
            <p>Released: {released}</p>
            <p>Publisher: {publisher}</p>
            <SubBlock title = 'Authors' content = {authors}/>
            <SubBlock orientation = "horizontal" title = 'Characters' content = {characters}/>
            <SubBlock orientation = "horizontal" title = 'povCharacters' content = {povCharacters}/>
        </div>
    );
}