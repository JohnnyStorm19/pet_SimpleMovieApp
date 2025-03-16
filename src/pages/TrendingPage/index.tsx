// import { useTrendings } from "@/hooks/useTrendings";
import MyError from "@/components/Error/MyError";
import { ItemCardsList } from "@/entities/item-card";
import { useGetTrendingItems } from "@/shared/hooks/use-get-trending-items";
import { Loader } from "@/shared/ui";
import { TrendingSwitcher, Pagination } from "@/widgets";
import {
  TContentSwitcher,
  TPeriodSwitcher,
} from "@/widgets/TrendingSwitcher/model/switcher-options.type";
import { useState } from "react";
import style from "./TrendingPage.module.css";
import { useGetSearchParams } from "@/shared/hooks";

export const TrendingPage = () => {
  const mainType = "trending";
  const [currentPage, setCurrentPage] = useState(0);

  const { currentParam: contentSwitcherValue } =
    useGetSearchParams<TContentSwitcher>({
      getParam: "contentType",
      defaultParam: "all",
    });
  const { currentParam: periodSwitcherValue } =
    useGetSearchParams<TPeriodSwitcher>({
      getParam: "period",
      defaultParam: "week",
    });

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
