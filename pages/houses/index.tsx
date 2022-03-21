import { GetStaticProps } from "next";
import { HouseCard } from '../../public/src/components/HouseCard/HouseCard';
import { getFetchStatusHouses, getHouses, getPage } from "../../public/src/selectors/houses";
import { clearHouses, fetchHouses, incrementPage } from "../../public/src/slices/houses";
import { wrapper } from "../../public/src/store/IceAndFireStore";
import { PageWithFetchContent, IWithContentPageProps } from "../../public/src/HOC/PageWithFetchContent/PageWithFetchContent";

const HousesPageProps : IWithContentPageProps = {
    title: 'Houses',
    ContentCard: HouseCard ,
    getPage,
    getFetchStatus: getFetchStatusHouses,
    getContent: getHouses,
    incrementPage,
    fetchContent: fetchHouses,
};

const HousesPage = ( ): JSX.Element => {
    return(<PageWithFetchContent {...HousesPageProps} />);
            
};

export const getStaticProps : GetStaticProps = wrapper.getStaticProps(store => async () => {
    try{
        store.dispatch(clearHouses(null));
        const { page } = store.getState().books;
        store.dispatch(fetchHouses(page));
    }
    catch(e){
        console.log(e);
    }
    finally{
        return { props: { houses:[] } };
    }
});

export default HousesPage;