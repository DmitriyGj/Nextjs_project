import { getCharacterFullInfo, getCharactersStoreInfo } from "../../../public/src/selectors/charactersSelectors";
import { useDispatch, useSelector } from "react-redux";

import { CharacterBlock } from "../../../public/src/components/CharacterBlock/CharacterBlock";
import { FetchStatus } from "../../../public/src/constants";
import { Loader } from "../../../public/src/components/Loader/Loader";
import { fetchCharacterInfo } from "../../../public/src/reducers/CharactersReducer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { withLayout } from "../../../public/src/HOC/Layout/Layout";
import { wrapper } from "../../../public/src/HOC/ReduxWeapper/ReduxWrapper";

const CharacterPage = () =>{
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();
    const {fetchStatus} = useSelector(getCharactersStoreInfo);
    const characterInfo= useSelector(getCharacterFullInfo);

    useEffect(()=>{
        if(id){
            dispatch(fetchCharacterInfo(id as string));
        }
    },[id]);

    return(
        <div>
            {fetchStatus === FetchStatus.Fulfilled && characterInfo && <CharacterBlock {...characterInfo} />}
            {fetchStatus === FetchStatus.Pending && <Loader />}
            {fetchStatus === FetchStatus.Rejected && <p>Что-то пошло не так, не удалось получить информацию</p>}
        </div>
    );
};

CharacterPage.getInitialProps = wrapper.getInitialPageProps(
    ({dispatch}) => async() =>{
        const router = useRouter();
        const {id} = router.query; 
        dispatch(fetchCharacterInfo(id?.toString() || '1'))
    }
)

export default withLayout(CharacterPage);