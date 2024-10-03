import { useSearchById } from "@/shared/hooks";
import style from "./index.module.css";
import { ISeasonData, ITvCard_Single, TGenresFor } from "@/types/models";
import { Loader, MyError } from "@/shared/ui";
import { SeasonItem } from "./SeasonItem";
import { useEffect, useState } from "react";

export const TVSeasons = ({ type= "tvSeries" }: { type?: TGenresFor }) => {
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

      {result && result.seasons && (
        <div className={style.seasons_container}>
          {result.seasons &&
            result.seasons.map((season: ISeasonData) => {
              if (season.season_number === 0) return;
              return <SeasonItem key={season.id} seasonData={season} />;
            })}
        </div>
      )}
    </div>
  );
};
