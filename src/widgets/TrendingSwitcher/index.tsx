import style from "./TrendingSwitcher.module.css";

type TPeriodSwitcher = "week" | "day";
type TContentSwitcher = "all" | "movie" | "tv";

interface ISearchSwitcherProps {
  handlePeriodSwitcher: (type: TPeriodSwitcher) => void;
  handleContentSwitcher: (type: TContentSwitcher) => void;
  periodType: "week" | "day";
  contentType: "all" | "movie" | "tv";
}

export const TrendingSwitcher = ({
  handlePeriodSwitcher,
  handleContentSwitcher,
  periodType,
  contentType,
}: ISearchSwitcherProps) => {
  const onPeriodBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute("data-search-type");
    handlePeriodSwitcher(searchType as TPeriodSwitcher);
  };

  const onContentBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute("data-search-type");
    handleContentSwitcher(searchType as TContentSwitcher);
  };

  return (
    <div className={style.container}>
      <div className={style.switcher_container}>
        <button
          data-search-type="day"
          onClick={onPeriodBtnClick}
          className={`${style.switcher__btn} ${
            periodType === "day" ? style.clicked : ""
          }`}
        >
          Trending this day
        </button>
        <button
          data-search-type="week"
          onClick={onPeriodBtnClick}
          className={`${style.switcher__btn} ${
            periodType === "week" ? style.clicked : ""
          }`}
        >
          Trending this week
        </button>
      </div>
      <div className={style.switcher_container}>
        <button
          data-search-type="all"
          onClick={onContentBtnClick}
          className={`${style.switcher__btn} ${
            contentType === "all" ? style.clicked : ""
          }`}
        >
          Trending all
        </button>
        <button
          data-search-type="movie"
          onClick={onContentBtnClick}
          className={`${style.switcher__btn} ${
            contentType === "movie" ? style.clicked : ""
          }`}
        >
          Trending movies
        </button>
        <button
          data-search-type="tv"
          onClick={onContentBtnClick}
          className={`${style.switcher__btn} ${
            contentType === "tv" ? style.clicked : ""
          }`}
        >
          Trending serials / TVshows
        </button>
      </div>
    </div>
  );
};
