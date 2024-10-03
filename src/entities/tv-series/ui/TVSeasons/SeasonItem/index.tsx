import { ISeasonData } from "@/types/models";
import style from "./index.module.css";
import { REQUEST_URLS } from "@/shared/api/requestApi";

export const SeasonItem = ({ seasonData }: { seasonData: ISeasonData }) => {
  return (
    <div className={style.season_container}>
      <header>
        <h3> {seasonData.name}</h3>
      </header>
      <main className={style.main}>
        <div className={style.img_container}>
          {seasonData.poster_path && (
            <img
              src={`${REQUEST_URLS.images.IMG_300}/${seasonData.poster_path}`}
              alt={`${seasonData.name} poster`}
              loading="lazy"
            />
          )}
        </div>
        <div className={style.info}>
          <span> Episodes: {seasonData.episode_count}</span>
          <span>
            Release year:{" "}
            {seasonData.air_date ? seasonData.air_date.slice(0, 4) : ""}
          </span>
          {seasonData.overview.length > 0 && (
            <details className={style.details}>
              <summary className={style.synopsis}>Season synopsis</summary>
              <p className={style.synopsis__text}>{seasonData.overview}</p>
            </details>
          )}
        </div>
      </main>
    </div>
  );
};
