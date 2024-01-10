import Pagination from "../../components/UI/Pagination/Pagination";
import { useTrendings } from "../../hooks/useTrendings";
import { useState } from "react";
import ItemCardsList from "../../components/ItemCardsList/ItemCardsList";
// import Loader from "../components/Loader/Loader";
// import MyError from "../components/Error/MyError";
import SearchSwitcherNew from "../../components/UI/SearchSwitcherNew/SearchSwitcherNew";
import style from "./TrendingPage.module.css";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import Loader from "../../components/Loader/Loader";

type TPeriodSwitcher = "week" | "day";
type TContentSwitcher = "all" | "movie" | "tv";

const TrendingPage = () => {
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
      {/* {error && <MyError />} */}
      <div className={style.trending_container}>
        <PageHeader />
        <header className={style.header}>
          <h2 className={style.pageTitle}>Trending now</h2>
        </header>
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

export default TrendingPage;
