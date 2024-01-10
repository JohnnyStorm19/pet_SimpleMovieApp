import { useLocation, useParams } from "react-router-dom";
import style from "./Similar.module.css";
import { useState } from "react";
import { useGetSimilar } from "../../hooks/useGetSimilar";

import ItemCardsList from "../ItemCardsList/ItemCardsList";
import Loader from "../Loader/Loader";
import MyError from "../Error/MyError";
const Similar = () => {
  const [shouldSearch, setShouldSearch] = useState(true);
    const location = useLocation();
    const mainType = location.pathname.includes('movie') ? 'movie' : 'tvSeries';

  const { id } = useParams();
  let numberId;
  if (id) {
    numberId = Number(id);
  }

  const [{ searchResult, searchLoader, searchError }] = useGetSimilar(
    numberId,
    shouldSearch,
    setShouldSearch
  );
  if (searchResult) {
    console.log("SIMILAR CONTENT: ", searchResult);
  }
  return (
    <div className={style.similar_container}>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

        {searchResult && (
            <ItemCardsList mainType={mainType} recievedData={searchResult.results}/>
        )}
    </div>

  );
};

export default Similar;
