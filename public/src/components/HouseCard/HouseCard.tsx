import { IHouseCardProps } from "./HouseCard.props";
import style from './CharacterCard.module.scss'

const HouseCard = ({name, region}: IHouseCardProps): JSX.Element => {
    return(<div className = {style.HouseCard} >
            <p>Name: {name}</p>
            <p>Region: {region}</p>
        </div>)
}

export {HouseCard};