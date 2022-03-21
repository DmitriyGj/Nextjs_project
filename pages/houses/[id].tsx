import { GetServerSideProps } from 'next';
import { HouseAPI } from '../../public/src/services';
import { HouseBlock } from "../../public/src/components/HouseBlock/HouseBlock";
import { wrapper } from '../../public/src/store/IceAndFireStore';
import { clearHouses, fetchHouse, fetchHouses, setCurrentHouse  } from '../../public/src/slices/houses';
import { getCurrentHouse } from '../../public/src/selectors/houses';
import { useAppSelector } from '../../public/src/store/hooks';

const HousePage = ( ) =>{
    const houseInfo = useAppSelector(getCurrentHouse);

    return(
        <div>
            <HouseBlock { ...houseInfo } />
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
            
            const res = (await store.dispatch(fetchHouse(id))).payload;
            if(!res){
                return { notFound: true };
            }
        }
        catch(e){
            console.log(e);
            store.dispatch(setCurrentHouse(null));
            return { notFound: true };
        }
        finally{
            return { props: { } };
        }
    });



export default HousePage;