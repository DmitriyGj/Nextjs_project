import { GetServerSideProps } from 'next';
import { HouseAPI } from '../../public/src/services';
import { HouseBlock } from "../../public/src/components/HouseBlock/HouseBlock";
import { IHouseFullInfo } from "../../public/src/ts";
import { withLayout } from "../../public/src/HOC/Layout/Layout";

interface IHousePageProps extends Record<string, unknown> {
    houseInfo: IHouseFullInfo
}

const HousePage = ( { houseInfo } : IHousePageProps) =>{

    return(
        <div>
            <HouseBlock { ...houseInfo } />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    if(!id ){
        return {props: { houseInfo: {} } };
    }
    const houseInfo = await HouseAPI.getFullData(id.toString());
    return {props: { houseInfo} };
};



export default HousePage;