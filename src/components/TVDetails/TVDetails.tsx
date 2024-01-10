import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchById } from "../../hooks/useSearchById";
import { ITvCard_Single, TGenresFor } from "../../types/models";
import DetailsGroup from "./DetailsGroup";
import Loader from "../Loader/Loader";

const TVDetails = ({type}: {type: TGenresFor}) => {
    const { id } = useParams();
    const [shouldSearch, setShouldSearch] = useState(true);
    let numberId;
    if (id) {
      numberId = Number(id);
    }
    const [{ searchResult, searchLoader, searchError }] = useSearchById(
      type,
      numberId,
      shouldSearch,
      setShouldSearch
    );
  
    return (
      <div>
        {searchLoader && <Loader />}
        {searchResult && (
          <DetailsGroup detailsArray={searchResult as ITvCard_Single}/>
        )}
      </div>
    );
}

export default TVDetails
