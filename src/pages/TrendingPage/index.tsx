// import { useTrendings } from "@/hooks/useTrendings";
import MyError from "@/components/Error/MyError";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useGetTrendingItems } from "@/shared/hooks/use-get-trending-items";
import { Loader } from "@/shared/ui";
import { TrendingSwitcher } from "@/widgets";
import { useState } from "react";
import style from "./TrendingPage.module.css";

type TPeriodSwitcher = "week" | "day";
type TContentSwitcher = "all" | "movie" | "tv";

export const TrendingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [periodSwitcherValue, setPeriodSwitcherValue] =
    useState<TPeriodSwitcher>("week");
  const [contentSwitcherValue, setContentSwitcherValue] =
    useState<TContentSwitcher>("all");
  const {
    data: trendingData,
    isSuccess,
    isLoading,
    error,
  } = useGetTrendingItems({
    contentSwitcherValue,
    periodSwitcherValue,
    currentPage,
  });

  const handlePageClick = (e: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(e.selected);
  };

  const handleContentSwitcher = (type: TContentSwitcher) => {
    setCurrentPage(0);
    setContentSwitcherValue(type);
  };
  const handlePeriodSwitcher = (type: TPeriodSwitcher) => {
    setCurrentPage(0);
    setPeriodSwitcherValue(type);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <MyError />}

      <div className={style.trending_container}>
        <h2 className={style.pageTitle}>Trending now</h2>
        <TrendingSwitcher
          handlePeriodSwitcher={handlePeriodSwitcher}
          handleContentSwitcher={handleContentSwitcher}
          contentType={contentSwitcherValue}
          periodType={periodSwitcherValue}
        />
        {isSuccess && (
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

// const [shouldSearch, setShouldSearch] = useState(true);
// const [{ trendingData, isLoading, error }] = useTrendings(
//   currentPage,
//   periodSwitcherValue,
//   contentSwitcherValue,
//   shouldSearch,
//   setShouldSearch
// );
