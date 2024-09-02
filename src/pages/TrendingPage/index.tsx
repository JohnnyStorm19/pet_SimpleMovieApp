import MyError from "@/components/Error/MyError";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import Pagination from "@/components/UI/Pagination/Pagination";
import SearchSwitcherNew from "@/components/UI/SearchSwitcherNew/SearchSwitcherNew";
import { useTrendings } from "@/hooks/useTrendings";
import { Loader } from "@/shared/ui";
import { useState } from "react";
import style from "./TrendingPage.module.css";

type TPeriodSwitcher = "week" | "day";
type TContentSwitcher = "all" | "movie" | "tv";

export const TrendingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldSearch, setShouldSearch] = useState(true);
  const [periodSwitcherValue, setPeriodSwitcherValue] =
    useState<TPeriodSwitcher>("week");
  const [contentSwitcherValue, setContentSwitcherValue] =
    useState<TContentSwitcher>("all");

  const [{ trendingData, isLoading, error }] = useTrendings(
    currentPage,
    periodSwitcherValue,
    contentSwitcherValue,
    shouldSearch,
    setShouldSearch
  );

  const handlePageClick = (e: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(e.selected);
    setShouldSearch(true);
  };

  const handleContentSwitcher = (type: TContentSwitcher) => {
    setShouldSearch(true);
    setCurrentPage(0);
    setContentSwitcherValue(type);
  };
  const handlePeriodSwitcher = (type: TPeriodSwitcher) => {
    setShouldSearch(true);
    setCurrentPage(0);
    setPeriodSwitcherValue(type);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <MyError />}

      <div className={style.trending_container}>
        <h2 className={style.pageTitle}>Trending now</h2>
        <SearchSwitcherNew
          handlePeriodSwitcher={handlePeriodSwitcher}
          handleContentSwitcher={handleContentSwitcher}
          contentType={contentSwitcherValue}
          periodType={periodSwitcherValue}
        />
        {trendingData && trendingData.results.length > 0 && (
          <ItemCardsList
            recievedData={trendingData.results}
            mainType="trending"
          />
        )}
        {trendingData && trendingData.total_pages && (
          <Pagination
            totalPageCount={
              trendingData.total_pages > 500 ? 500 : trendingData.total_pages
            }
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        )}
      </div>
    </>
  );
};
