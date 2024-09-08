import MyError from "@/components/Error/MyError";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import SearchWidget from "@/components/SearchWidget/SearchWidget";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useGetGenres } from "@/shared/hooks/use-get-genres";
import { useSearchByGenre } from "@/shared/hooks/use-search-by-genre";
import { useSearchByKeyword } from "@/shared/hooks/use-search-by-keyword";
import { ISearchByResponse } from "@/shared/models/search-by-response.interface";
import { Loader } from "@/shared/ui";
import { IFormData } from "@/types/models";
import { SearchSwitcher } from "@/widgets";
import { Genres } from "@/widgets/Genres/ui";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./TVseriesPage.module.css";

export const TVseriesPage = () => {
  const type = "tvSeries";
  const [currentPage, setCurrentPage] = useState(0);
  // const [currentSearchType, setCurrentSearchType] = useState("keyword");
  const { data: genres, isSuccess } = useGetGenres(type);
  const [searchParams] = useSearchParams();
  const currentSearchType = searchParams.get("searchType") || "keyword";
  const [keyWord, setKeyWord] = useState({ searchInput: "" });
  const [searchedByKeywordRes, setSearchByKeywordRes] =
    useState<ISearchByResponse>();
  const selectedGenresIds = useMemo((): number[] => {
    const genresSelected = searchParams.get("genres");
    const genresArray = genresSelected
      ? genresSelected.split("+").map(Number)
      : [];

    if (genresArray.length > 0 && isSuccess) {
      return genres
        .filter((genre) => genresArray.includes(genre.id))
        .map((genre) => genre.id);
    }

    return [];
  }, [searchParams, genres, isSuccess]);
  const {
    data: searchedByGenreRes,
    isLoading: isSearchByGenrePending,
    isError: isSearchByGenreError,
  } = useSearchByGenre(selectedGenresIds, type, currentPage);
  const searchByKeyword = useSearchByKeyword(
    keyWord.searchInput,
    type,
    currentPage
  );

  const handlePageClick = (e: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(e.selected);
  };

  const handleSubmitForm = async (formData: IFormData) => {
    setKeyWord(formData);
    const res = await searchByKeyword.mutateAsync();
    setSearchByKeywordRes(res);
  };

  return (
    <div className={style.tv_container}>
      {isSearchByGenrePending && <Loader />}
      {isSearchByGenreError && <MyError />}

      <h2 className={style.pageTitle}>Serials / TV-shows</h2>
      <SearchSwitcher />

      {currentSearchType === "keyword" && (
        <SearchWidget onFormSubmit={handleSubmitForm} />
      )}

      {currentSearchType === "genre" && isSuccess && (
        <Genres contentType={type} />
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

      {searchedByGenreRes && searchedByGenreRes.total_pages && (
        <Pagination
          totalPageCount={
            searchedByGenreRes.total_pages > 500
              ? 500
              : searchedByGenreRes.total_pages
          }
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      )}
      {searchedByKeywordRes &&
        searchedByKeywordRes.total_pages &&
        currentSearchType === "keyword" && (
          <Pagination
            totalPageCount={
              searchedByKeywordRes.total_pages > 500
                ? 500
                : searchedByKeywordRes.total_pages
            }
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        )}
    </div>
  );
};
