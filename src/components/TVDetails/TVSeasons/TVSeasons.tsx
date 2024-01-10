import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchById } from "../../../hooks/useSearchById";
import { ISeasonData, TGenresFor } from "../../../types/models";
import SeasonItem from "../SeasonItem/SeasonItem";
import style from './TVSeasons.module.css'
import Loader from "../../Loader/Loader";
import MyError from "../../Error/MyError";

const TVSeasons = ({ type }: {type: TGenresFor}) => {
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
      {searchError && <MyError />}
      
      {searchResult && (
        <div className={style.seasons_container}>
          {"seasons" in searchResult && searchResult.seasons.map((season: ISeasonData) => {
            if (season.season_number === 0) return;
            return (
              <SeasonItem key={season.id} seasonData={season} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TVSeasons;
