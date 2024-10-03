import { useGetCredits } from "@/shared/hooks/use-get-credits";
import { Link, useLocation } from "react-router-dom";
import { ICreditsCast, TGenresFor } from "../../types/models";
import MyError from "../Error/MyError";
import Loader from "../Loader/Loader";
import style from "./Cast.module.css";
import CastItem from "./CastItem";
import TVCastItem from "./TVCastItem";

// todo отрефактори компонент! декомпозируй, вынеси это в фичи или в ui

export const Cast = ({ type }: { type: TGenresFor }) => {
  const location = useLocation();

  const {
    data: credits,
    isLoading: creditsLoader,
    isError: creditsError,
    isSuccess,
  } = useGetCredits(type);

  return (
    <div
      className={
        type === "movie" ? style.details_wrapper : style.details_wrapper_TV
      }
    >
      {creditsLoader && <Loader />}
      {creditsError && <MyError />}

      {isSuccess && (
        <>
          {credits?.cast.map((person) => {
            if (type === "movie") {
              return (
                <CastItem key={person.id} person={person as ICreditsCast} />
              );
            }
            return (
              <TVCastItem key={person.id} person={person as ICreditsCast} />
            );
          })}
        </>
      )}
      {type === "tvSeries" && (
        <Link
          to={`${location.pathname}/cast-full`}
          className={style.goToFullBtn}
        >
          Go to full cast and crew
        </Link>
      )}
    </div>
  );
};
