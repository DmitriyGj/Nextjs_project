import {IHouseBlockProps} from './HouseBlock.props';
import { SubBlock } from '../SubBlock/SubBlock';
import style from './HouseBlock.module.scss';

export const HouseBlock = ({name,
                                titles,
                                region,
                                words,
                                seats,
                                currentLord, 
                                heir, 
                                overlord, 
                                founded, 
                                founder, 
                                diedOut, 
                                ancestralWeapons, 
                                cadetBranches, 
                                swornMembers, 
                                }: IHouseBlockProps) => {
    return(
        <div className={style.main}>
            <p>Name: {name}</p>
            <p>Region: {region}</p>
            <p>Words: {words}</p>
            <p>Heir: {heir}</p>
            <p>Current lord: {currentLord}</p>
            <p>Overlord:{ overlord || '-'}</p>
            {<p>Founded:{founded || '-'}</p>}
            <p>Founder: {founder}</p>
            <p>Died out: {diedOut}</p>
            <SubBlock title='Titles' content={titles} />
            <SubBlock title='Seats' content={seats} />
            <SubBlock title='Ancestral weapons' content={ancestralWeapons} />
            <SubBlock title='Cadet branches' content={cadetBranches} />
            <SubBlock title='Sworn members' content={swornMembers} />            
        </div>
    );
};