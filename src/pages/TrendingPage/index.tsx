// import { useTrendings } from "@/hooks/useTrendings";
import MyError from "@/components/Error/MyError";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useGetTrendingItems } from "@/shared/hooks/use-get-trending-items";
import { Loader } from "@/shared/ui";
import { TrendingSwitcher } from "@/widgets";
import { useState } from "react";
import style from "./TrendingPage.module.css";
import { useSearchParams } from "react-router-dom";
import {
  TContentSwitcher,
  TPeriodSwitcher,
} from "@/widgets/TrendingSwitcher/model/switcher-options.type";

export const TrendingPage = () => {
  const mainType = "trending";
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();

  const contentSwitcherValue = (searchParams.get("contentType") ||
    "all") as TContentSwitcher;
  const periodSwitcherValue = (searchParams.get("period") ||
    "week") as TPeriodSwitcher;

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

  return (
    <>
      {isLoading && <Loader />}
      {error && <MyError />}

      <div className={style.trending_container}>
        <h2 className={style.pageTitle}>Trending now</h2>
        <TrendingSwitcher />
        {isSuccess && (
          <ItemCardsList
            recievedData={trendingData.results}
            mainType={mainType}
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
