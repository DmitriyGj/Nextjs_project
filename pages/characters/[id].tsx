import { CharacterAPI } from '../../public/src/services';
import {CharacterBlock} from '../../public/src/components/CharacterBlock/CharacterBlock';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../public/src/store/IceAndFireStore';
import { setCurrentCharacter } from '../../public/src/slices/characters';
import { useAppSelector } from '../../public/src/store/hooks';
import { getCurrentCharacter } from '../../public/src/selectors/characters';

const CharacterPage = () =>{
    const characterInfo = useAppSelector(getCurrentCharacter);
    return(
        <div>
            <CharacterBlock {...characterInfo} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    try{
        const  id  = ctx.query.id as string;
        if(!id ){
            return {notFound: true};
        }

        const characterInfo = await CharacterAPI.getFullData(id);
        if(!characterInfo){
            return { notFound: true };
        }

        store.dispatch(setCurrentCharacter(characterInfo));
        return { props: { characterInfo } };
    }
    catch(e){
        console.log(e);
        store.dispatch(setCurrentCharacter(null));
        return { notFound: true };
    }
});



export default CharacterPage;