import { getCharacterFullInfo, getCharactersStoreInfo } from "../../../../public/src/selectors/charactersSelectors";

import { Loader } from "../../../../public/src/components/Loader/Loader";
import { fetchCharacterInfo } from "../../../../public/src/reducers/CharactersReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CharacterPage = () =>{
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();
    const {fetchStatus} = useSelector(getCharactersStoreInfo);
    const characterInfo= useSelector(getCharacterFullInfo);


    useEffect(()=>{
            dispatch(fetchCharacterInfo(id as string));
    },[id]);


    return(
        <div>
            {fetchStatus === 'fulfilled' && characterInfo && <h1>{characterInfo?.name}</h1>}
            {fetchStatus === 'pending' && <Loader />}
        </div>
    )
};

export default CharacterPage;