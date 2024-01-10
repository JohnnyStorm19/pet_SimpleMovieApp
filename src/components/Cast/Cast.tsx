import { useState } from "react";
import { useGetCredits } from "../../hooks/useGetCredits";
import { ICreditsCast, TGenresFor } from "../../types/models";
import { Link, useLocation, useParams } from "react-router-dom";
import style from "./Cast.module.css";
import CastItem from "./CastItem";
import TVCastItem from "./TVCastItem";

const Cast = ({ type }: { type: TGenresFor }) => {
  const { id } = useParams();
  const [shouldSearch, setShouldSearch] = useState(true);
  const location = useLocation();

  let numberId;
  if (id) {
    numberId = Number(id);
  }
  const [{ credits, creditsLoader, creditsError }] = useGetCredits(
    type,
    numberId,
    shouldSearch,
    setShouldSearch
  );

  return (
    <div className={type === "movie" ? style.details_wrapper : style.details_wrapper_TV}>
      {credits && (
        <>
          {credits.cast.map((person) => {
            if (type === 'movie') {
              return (
                <CastItem key={person.id} person={person as ICreditsCast}/>
              );
            }
            return <TVCastItem key={person.id} person={person as ICreditsCast}/>
          })}
        </>
      )}
      {type === "tvSeries" && (
        <Link to={`${location.pathname}/cast-full`} className={style.goToFullBtn}>Go to full cast and crew</Link>
      )}
    </div>
  );
};

export default Cast;
