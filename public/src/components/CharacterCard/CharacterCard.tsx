import { ICharacterCardProps } from "./ChracterCard.props";
import style from './CharacterCard.module.scss'

const ChracterCard = ({name, gender, culture}: ICharacterCardProps): JSX.Element => {
    return(<div className = {style.CharacterCard} >
            <p>Имя: {name}</p>
            <p>Пол: {gender}</p>
            <p>Культура: {culture}</p>
        </div>)
}

export {ChracterCard};