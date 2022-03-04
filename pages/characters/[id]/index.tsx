import { getCharacterFullInfo, getCharactersStoreInfo } from "../../../public/src/selectors/charactersSelectors";

import { CharacterBlock } from "../../../public/src/components/CharacterBlock/CharacterBlock";
import { Loader } from "../../../public/src/components/Loader/Loader";
import { fetchCharacterInfo } from "../../../public/src/reducers/CharactersReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { withLayout } from "../../../public/src/HOC/Layout/Layout";

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
            {fetchStatus === 'fulfilled' && characterInfo && <CharacterBlock {...characterInfo} />}
            {fetchStatus === 'pending' && <Loader/>}
            {fetchStatus === 'rejected' && <p>Что-то пошло не так, не удалось получить информацию</p>}
        </div>
    )
};

export default withLayout(CharacterPage);