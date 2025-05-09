import { ItemCardsList } from "@/entities/item-card";
import {
  useGetGenres,
  useGetSearchParams,
  useSearchByGenre,
  useSearchByKeyword,
} from "@/shared/hooks";
import { Loader, MyError } from "@/shared/ui";
import { Genres, Pagination, SearchSwitcher, SearchForm } from "@/widgets";
import React, { useEffect, useState } from "react";
import style from "./MoviePage.module.css";
import { useGetSelectedGenresIds } from "./lib/hooks/useGetSelectedGenresIds";
import { ISearchFormData } from "@/widgets/SearchForm/model/types";

//todo переделать пагинацию в url-параметры

export const MoviePage = () => {
  const type = "movie";
  const [currentPage, setCurrentPage] = useState(0);
  const { data: genres, isSuccess, isPending, isError } = useGetGenres(type);
  const { currentParam: currentSearchType } = useGetSearchParams<
    "keyword" | "genre"
  >({
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

  const handleSubmitForm = async (formData: ISearchFormData) => {
    setKeyWord(formData);
    refetch();
  };
  return (
    <div className={style.moviePage_container}>
      {isSearchByGenrePending || (searchByKeywordPending && <Loader />)}
      {isSearchByGenreError && <MyError />}

      <h2 className={style.pageTitle}>Movies</h2>
      <SearchSwitcher />

      {currentSearchType === "keyword" && (
        <SearchForm onFormSubmit={handleSubmitForm} />
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
