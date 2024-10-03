import { REQUEST_URLS } from "../../services/api/requestApi";
import { ITvCard_Single } from "../../types/models";
import ProjectRating from "../ProjectRating/ProjectRating";
import style from "./TvCard_Single.module.css";

interface ITvCard_SingleProps {
  searchResult: ITvCard_Single;
}

// todo удалить

const getProductionYears = (result: ITvCard_Single) => {
  const start = result.first_air_date.slice(0, 4);
  if (result.in_production) {
    return `${start}-...`;
  }
  const end = result.last_air_date.slice(0, 4);
  if (end === start) {
    return start;
  }
  return `${start}-${end}`;
};

const TvCard_Single = ({ searchResult }: ITvCard_SingleProps) => {

  return (
    <div className={style.tvCard_single_container}>
      <main className={style.main}>
        <div className={style.img_container}>
          <img
            src={`${REQUEST_URLS.images.IMG_300}/${searchResult.poster_path}`}
            alt={`${searchResult.name} poster`}
            loading="lazy"
          />
        </div>
        <h2 className={style.title}>{searchResult.name}</h2>
        <div className={style.details}>
          <h4 className={style.tagline}>{searchResult.tagline}</h4>
          <h4 className={style.first_air_date}>
            <span className={style.detailTitle}>Production years: </span>
            {getProductionYears(searchResult)}
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

export default TvCard_Single;
