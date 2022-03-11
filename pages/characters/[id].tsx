import { CharacterAPI } from '../../public/src/services';
import {CharacterBlock} from '../../public/src/components/CharacterBlock/CharacterBlock';
import { GetServerSideProps } from 'next';
import { ICharacterFullInfo } from '../../public/src/ts';
import { withLayout } from '../../public/src/HOC/Layout/Layout';

interface ICharacterPageProps extends Record<string, unknown>{
    characterInfo: ICharacterFullInfo
}

const CharacterPage = ({ characterInfo } : ICharacterPageProps) =>{

    return(
        <div>
            <CharacterBlock {...characterInfo} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    if(!id ){
        return {props: { characterInfo: {}}};
    }
    const characterInfo = await CharacterAPI.getFullData(id.toString());
    return {props: { characterInfo } };
};



export default CharacterPage;