import { ICharacterCardProps } from "./CharacterCard.props";
import style from './CharacterCard.module.scss';

const CharacterCard = ({name, gender, culture}: ICharacterCardProps): JSX.Element => {
    return(<div className={style.CharacterCard} >
            <p>Имя: {name}</p>
            <p>Пол: {gender}</p>
            <p>Культура: {culture}</p>
        </div>);
};

export {CharacterCard};