import {ICharacterBlockProps} from './CharacterBlock.props';
import { SubBlock } from '../SubBlock/SubBlock';

export const CharacterBlock = ({name, 
                                gender,
                                culture,
                                born, 
                                died, 
                                titles, 
                                aliases, 
                                father, 
                                mother, 
                                spouse, 
                                allegiances, 
                                books, 
                                povBooks,
                                playedBy}: ICharacterBlockProps) => {
    return(
        <div>
            <p>Name: {name}</p>
            <p>Gender: {gender}</p>
            <p>Culture: {culture}</p>
            <p>Born: {born}</p>
            <p>Died:{died ? died : '-'}</p>
            {<p>Spouse:{spouse ? spouse : '-'}</p>}
            {(father || mother) && <p>Parents:{father} {mother}</p>}
            
            <SubBlock title = 'Titles' content = {titles}/>
            <SubBlock title = 'Aliases' content = {aliases}/>
            <SubBlock title = 'Allegiances' content = {allegiances} />
            <SubBlock title = 'Books' content = {books}/>
            <SubBlock title = 'povBooks' content = {povBooks}/>            
            <SubBlock title = 'Played by' content = {playedBy}/>
        </div>
    )
}