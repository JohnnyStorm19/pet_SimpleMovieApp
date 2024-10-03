import style from "./index.module.css";
import { useSearchById } from "@/shared/hooks";
import { CreatedBy } from "./CreatedBy";
import { ITvCard_Single, TGenresFor } from "@/types/models";
import { Loader, MyError } from "@/shared/ui";
import { useEffect, useState } from "react";

export const TVDetails = ({ type = "tvSeries" }: { type?: TGenresFor }) => {
  const [result, setResult] = useState<ITvCard_Single | undefined>(undefined);

  const {
    data: searchResult,
    isLoading: searchLoader,
    isError: searchError,
    isSuccess,
  } = useSearchById(type);

  useEffect(() => {
    if (isSuccess) {
      setResult(searchResult as ITvCard_Single);
    }
  }, [isSuccess, searchResult]);

  return (
    <div>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

      {result && (
        <div className={style.details__container}>
          {result.created_by.length > 0 && (
            <CreatedBy createdByArr={result.created_by} />
          )}
          {result.episode_run_time.length > 0 && (
            <div className={style.detail__container}>
              <span className={style.detail}>Episode run time: </span>
              {result.episode_run_time.map((time) => time + ", ")}
            </div>
          )}
          <div className={style.detail__container}>
            <span className={style.detail}>Episodes overall: </span>
            {result.number_of_episodes}
          </div>
          <div className={style.detail__container}>
            <span className={style.detail}>Seasons overall: </span>
            {result.number_of_seasons}
          </div>
          <div className={style.detail__container}>
            <span className={style.detail}>Status: </span>
            {result.status}
          </div>
        </div>
      )}
    </div>
  );
};
