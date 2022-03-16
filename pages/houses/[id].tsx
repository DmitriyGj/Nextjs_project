import { GetServerSideProps } from 'next';
import { HouseAPI } from '../../public/src/services';
import { HouseBlock } from "../../public/src/components/HouseBlock/HouseBlock";
import { IHouseFullInfo } from "../../public/src/ts";
import { withLayout } from "../../public/src/HOC/Layout/Layout";
import { wrapper } from '../../public/src/store/IceAndFireStore';
import { setCurrentHouse } from '../../public/src/slices/houses';
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

            const houseInfo = await HouseAPI.getFullData(id as string);
            if(!houseInfo){
                return { notFound: true };
            }
            
            store.dispatch(setCurrentHouse(houseInfo));
            return { props: { houseInfo: houseInfo } };
        }
        catch(e){
            console.log(e);
            store.dispatch(setCurrentHouse(null));
            return { notFound: true };
        }
    });



export default HousePage;