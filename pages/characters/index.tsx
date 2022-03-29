import { CharacterCard } from "../../public/src/components/CharacterCard/CharacterCard";
import { GetStaticProps} from "next";
import { wrapper } from "../../public/src/store/IceAndFireStore";
import { clearCharacters, fetchCharacters, incrementPage } from "../../public/src/slices/Characters/characters";
import { getCharacters, getFetchStatusCharacters, getPage } from "../../public/src/selectors/characters";
import{ IWithContentPageProps, PageWithFetchContent } from '../../public/src/HOC/PageWithFetchContent/PageWithFetchContent';

const CharactersPageProps: IWithContentPageProps = {
    title:'Characters',
    ContentCard: CharacterCard ,
    getPage,
    getFetchStatus: getFetchStatusCharacters,
    getContent: getCharacters,
    incrementPage,
    fetchContent: fetchCharacters,
};

const CharactersPage = ( ) => {
    return(<PageWithFetchContent {...CharactersPageProps} />);
};

export const  getStaticProps: GetStaticProps = wrapper.getStaticProps(
    (store) => async () => {
        try{
            store.dispatch(clearCharacters(null));
            const {page} = store.getState().characters;
            store.dispatch(fetchCharacters(page));
        }
        catch(e){
            console.log(e);
        }
        finally{
            return { props: { initCharacters: [] } };
        }
    }
);

export default CharactersPage;