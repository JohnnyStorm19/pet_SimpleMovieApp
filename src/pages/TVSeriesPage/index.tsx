import MyError from "@/components/Error/MyError";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import SearchWidget from "@/components/SearchWidget/SearchWidget";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useGetSearchParams } from "@/shared/hooks";
import { useGetGenres } from "@/shared/hooks/use-get-genres";
import { useSearchByGenre } from "@/shared/hooks/use-search-by-genre";
import { useSearchByKeyword } from "@/shared/hooks/use-search-by-keyword";
import { Loader } from "@/shared/ui";
import { IFormData } from "@/types/models";
import { SearchSwitcher } from "@/widgets";
import { Genres } from "@/widgets/Genres/ui";
import React, { useEffect, useState } from "react";
import { useGetSelectedGenresIds } from "./lib/hooks/useGetSelectedGenresIds";
import style from "./TVseriesPage.module.css";

//todo переделать пагинацию в url-параметры

export const TVseriesPage = () => {
  const type = "tvSeries";
  const [currentPage, setCurrentPage] = useState(0);
  const { data: genres, isSuccess, isError, isPending } = useGetGenres(type);
  const { currentParam: currentSearchType } = useGetSearchParams({
    getParam: "searchType",
    defaultParam: "keyword",
  });
  const [keyWord, setKeyWord] = useState({ searchInput: "" });
  const selectedGenresIds = useGetSelectedGenresIds({ isSuccess, genres });
  const {
    data: searchedByGenreRes,
    isLoading: isSearchByGenrePending,
    isError: isSearchByGenreError,
  } = useSearchByGenre(selectedGenresIds, type, currentPage);
  const {
    data: searchedByKeywordRes,
    refetch,
    isLoading: searchByKeywordPending,
  } = useSearchByKeyword(keyWord.searchInput, type, currentPage);

  useEffect(() => {
    if (keyWord.searchInput) {
      refetch();
    }
  }, [currentPage, refetch, keyWord.searchInput]);

  const paginationData =
    currentSearchType === "keyword" ? searchedByKeywordRes : searchedByGenreRes;

  const handlePageClick = (e: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(e.selected);
  };

  const handleSubmitForm = async (formData: IFormData) => {
    setKeyWord(formData);
    refetch();
  };

  return (
    <div className={style.tv_container}>
      {isSearchByGenrePending || (searchByKeywordPending && <Loader />)}
      {isSearchByGenreError && <MyError />}

      <h2 className={style.pageTitle}>Serials / TV-shows</h2>
      <SearchSwitcher />

      {currentSearchType === "keyword" && (
        <SearchWidget onFormSubmit={handleSubmitForm} />
      )}

      {currentSearchType === "genre" && isSuccess && (
        <Genres
          genres={genres}
          isError={isError}
          isPending={isPending}
          isSuccess={isSuccess}
        />
      )}

      {searchedByGenreRes && searchedByGenreRes.results.length > 0 && (
        <ItemCardsList
          recievedData={searchedByGenreRes.results}
          mainType={type}
        />
      )}
      {searchedByKeywordRes && currentSearchType === "keyword" && (
        <ItemCardsList
          recievedData={searchedByKeywordRes.results || []}
          mainType={type}
        />
      )}

      {paginationData?.total_pages && (
        <Pagination
          totalPageCount={
            paginationData.total_pages > 500 ? 500 : paginationData.total_pages
          }
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      )}
    </div>
  );
};
