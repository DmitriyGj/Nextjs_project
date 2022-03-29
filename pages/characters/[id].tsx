import {CharacterBlock} from '../../public/src/components/CharacterBlock/CharacterBlock';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../public/src/store/IceAndFireStore';
import { fetchCharacter, setCurrentCharacter } from '../../public/src/slices/Characters/characters';
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        try{
            const id = ctx.query.id as string;
            if(!id){
                return { notFound: true };
            }
            const res = (await store.dispatch(fetchCharacter(id))).payload;
            if(!res){
                return { notFound: true };
            }
        }
        catch(e){
            console.log(e);
            store.dispatch(setCurrentCharacter(null));
            return { notFound: true };
        }
        finally{
            return { props: { } };
        }
    });



export default CharacterPage;