import { AppRoutes } from "@/shared/routes";
import { Link } from "react-router-dom";
import style from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={style.menu}>
      <div className={style.row}>
        <Link
          to={AppRoutes.MOVIES}
          className={`${style.link} ${style.moviesTVLink}`}
        >
          Movies
        </Link>
        <span className={style.divider}> / </span>
        <Link
          to={AppRoutes.TV}
          className={`${style.link} ${style.moviesTVLink}`}
        >
          Serials
        </Link>
      </div>
      <div className={style.row}>
        <Link
          to={AppRoutes.TRENDS}
          className={`${style.link} ${style.trendingLink}`}
        >
          Trending now
        </Link>
      </div>
    </div>
  );
};
