import { REQUEST_URLS } from "@/shared/api/requestApi";
import { ProjectRating } from "@/shared/ui";
import {
    ICreditsCrew,
    IRecievedMovieCard_SingleData,
    IUseGetCreditsData,
} from "@/types/models";
import { getDirector } from "../../lib";
import { getBudget, getRuntime } from "../../lib/dealWithCredits";
import DirectedBy from "../DirectedBy";
import style from "./MovieCard_Single.module.css";

//todo ВСЕ РЕФАКТОРИТЬ НАХЕР

interface IMovieCard_SingleProps {
  searchResult: IRecievedMovieCard_SingleData;
  credits: IUseGetCreditsData;
}

export const MovieCard_Single = ({
  searchResult,
  credits,
}: IMovieCard_SingleProps) => {
  return (
    <div className={style.movieCard_single_container}>
      <header className={style.header}>
        <h2 className={style.title}>{searchResult.title}</h2>
      </header>
      <h3 className={style.release_date}>
        {/* {searchResult.release_date.slice(0, 4)} */}
        {searchResult.release_date.slice(0, 4)}
      </h3>
      {getDirector(credits.crew as ICreditsCrew[]) && (
        <DirectedBy crew={credits.crew as ICreditsCrew[]} />
      )}
      <h4 className={style.tagline}>{searchResult.tagline}</h4>
      <main className={style.movieCard_main}>
        <div className={style.img_container}>
          {searchResult.poster_path && (
            <img
              src={`${REQUEST_URLS.images.IMG_300}/${searchResult.poster_path}`}
              alt="poster"
            />
          )}
        </div>
        <div className={style.details}>
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
          {searchResult.vote_average > 0 && searchResult.vote_average && (
            <ProjectRating vote_average={searchResult.vote_average} />
          )}
          {searchResult.runtime > 0 && searchResult.runtime && (
            <div>
              <span className={style.detailTitle}>Runtime: </span>
              {getRuntime(searchResult.runtime)}
            </div>
          )}
          {searchResult.budget > 0 && searchResult.budget && (
            <div>
              <span className={style.detailTitle}>Budget: </span>{" "}
              {getBudget(searchResult.budget)}
            </div>
          )}
          {searchResult.revenue > 0 && searchResult.revenue && (
            <div>
              <span className={style.detailTitle}>Revenue: </span>{" "}
              {getBudget(searchResult.revenue)}
            </div>
          )}
          <div className={style.overview_block}>
            <p className={style.overview}>{searchResult.overview}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
