import { ITvCard_Single } from "@/types/models";
import style from "./index.module.css";
import { REQUEST_URLS } from "@/shared/api/requestApi";
import { useCallback } from "react";
import { getProductionYears } from "../../lib/getProductionYears";
import { ProjectRating } from "@/shared/ui";

interface ITvCard_SingleProps {
  searchResult: ITvCard_Single;
}

export const TvCard_Single = ({ searchResult }: ITvCard_SingleProps) => {
  const getProductionYearsMemo = useCallback(getProductionYears, []);

  return (
    <div className={style.tvCard_single_container}>
      <main className={style.main}>
        <div className={style.img_container}>
          <img
            src={`${REQUEST_URLS.images.IMG_300}/${searchResult.poster_path}`}
            alt={`${searchResult.name} poster`}
          />
        </div>
        <h2 className={style.title}>{searchResult.name}</h2>
        <div className={style.details}>
          <h4 className={style.tagline}>{searchResult.tagline}</h4>
          <h4 className={style.first_air_date}>
            <span className={style.detailTitle}>Production years: </span>
            {getProductionYearsMemo(searchResult)}
          </h4>
          {searchResult.vote_average > 0 && searchResult.vote_average && (
            <ProjectRating vote_average={searchResult.vote_average} />
          )}
          {searchResult.genres.length > 0 && (
            <div>
              <span className={style.detailTitle}>Genres: </span>
              <span>
                {searchResult.genres.map((genre, index, array) => {
                  if (index === array.length - 1) {
                    return genre.name;
                  }
                  return genre.name + ", ";
                })}
              </span>
            </div>
          )}
          <p className={style.overview}>{searchResult.overview}</p>
        </div>
      </main>
    </div>
  );
};
