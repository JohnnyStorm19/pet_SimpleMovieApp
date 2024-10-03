import { useSearchById } from "@/shared/hooks/use-search-by-id";
import { ISeasonData, TGenresFor } from "../../../types/models";
import MyError from "../../Error/MyError";
import Loader from "../../Loader/Loader";
import SeasonItem from "../SeasonItem/SeasonItem";
import style from "./TVSeasons.module.css";

// todo удалить

export const TVSeasons = ({ type }: { type: TGenresFor }) => {
  // const [{ searchResult, searchLoader, searchError }] = useSearchById(
  //   type,
  //   numberId,
  //   shouldSearch,
  //   setShouldSearch
  // );

  const {
    data: searchResult,
    isLoading: searchLoader,
    isError: searchError,
  } = useSearchById(type);

  return (
    <div>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

      {searchResult && (
        <div className={style.seasons_container}>
          {"seasons" in searchResult &&
            searchResult.seasons.map((season: ISeasonData) => {
              if (season.season_number === 0) return;
              return <SeasonItem key={season.id} seasonData={season} />;
            })}
        </div>
      )}
    </div>
  );
};
