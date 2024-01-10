import { Link } from "react-router-dom";
import style from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={style.menu}>
      <div className={style.row}>
        <Link to={'/movie'} className={`${style.link} ${style.moviesTVLink}`}>Movies</Link>
        <span className={style.divider}> / </span>
        <Link to={'/tv'} className={`${style.link} ${style.moviesTVLink}`}>Serials</Link>
      </div>
      <div className={style.row}>
        <Link to={'/trending'} className={`${style.link} ${style.trendingLink}`}>Trending now</Link>
      </div>
    </div>
  );
};

export default MainPage;
