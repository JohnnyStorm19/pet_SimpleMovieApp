import { useState } from "react";
import style from "./TrendingSwitcher.module.css";
import { useSearchParams } from "react-router-dom";
import {
  TContentSwitcher,
  TPeriodSwitcher,
} from "../model/switcher-options.type";

export const TrendingSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [periodSwitcherValue, setPeriodSwitcherValue] =
    useState<TPeriodSwitcher>(
      (searchParams.get("period") as TPeriodSwitcher) || "week"
    );
  const [contentSwitcherValue, setContentSwitcherValue] =
    useState<TContentSwitcher>(
      (searchParams.get("contentType") as TContentSwitcher) || "all"
    );

  const onPeriodBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute("data-search-type");
    if (searchType) {
      setPeriodSwitcherValue(searchType as TPeriodSwitcher);
      setSearchParams({
        contentType: contentSwitcherValue,
        period: searchType,
      });
    }
  };

  const onContentBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute("data-search-type");
    if (searchType) {
      setContentSwitcherValue(searchType as TContentSwitcher);
      setSearchParams({ period: periodSwitcherValue, contentType: searchType });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.switcher_container}>
        <button
          data-search-type="day"
          onClick={onPeriodBtnClick}
          className={`${style.switcher__btn} ${
            periodSwitcherValue === "day" ? style.clicked : ""
          }`}
        >
          Trending this day
        </button>
        <button
          data-search-type="week"
          onClick={onPeriodBtnClick}
          className={`${style.switcher__btn} ${
            periodSwitcherValue === "week" ? style.clicked : ""
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
            contentSwitcherValue === "all" ? style.clicked : ""
          }`}
        >
          Trending all
        </button>
        <button
          data-search-type="movie"
          onClick={onContentBtnClick}
          className={`${style.switcher__btn} ${
            contentSwitcherValue === "movie" ? style.clicked : ""
          }`}
        >
          Trending movies
        </button>
        <button
          data-search-type="tv"
          onClick={onContentBtnClick}
          className={`${style.switcher__btn} ${
            contentSwitcherValue === "tv" ? style.clicked : ""
          }`}
        >
          Trending serials / TVshows
        </button>
      </div>
    </div>
  );
};
