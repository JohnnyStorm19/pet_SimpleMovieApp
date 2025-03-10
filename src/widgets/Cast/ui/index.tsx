import { MovieCastItem, TVCastItem } from "@/entities/cast";
import { useGetCredits } from "@/shared/hooks";
import { Loader, MyError } from "@/shared/ui";
import { Link, useLocation } from "react-router-dom";
import style from "./index.module.css";
import { TGenresFor } from "@/types/models"; // todo перенести в shared или в соответствующий entity
import { ICreditsCast } from "@/entities/cast/model/types.interface";

export type TCastProps = Exclude<TGenresFor, "trending">;

export const Cast = ({ type }: { type: TCastProps }) => {
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
                <MovieCastItem
                  key={person.id}
                  person={person as ICreditsCast}
                />
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
