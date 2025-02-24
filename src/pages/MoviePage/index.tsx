import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import SearchWidget from "@/components/SearchWidget/SearchWidget";
import Pagination from "@/components/UI/Pagination/Pagination";
import {
  useGetGenres,
  useGetSearchParams,
  useSearchByGenre,
  useSearchByKeyword,
} from "@/shared/hooks";
import { ISearchByResponse } from "@/shared/models/search-by-response.interface";
import { Loader, MyError } from "@/shared/ui";
import { IFormData } from "@/types/models";
import { SearchSwitcher } from "@/widgets";
import { Genres } from "@/widgets/Genres/ui";
import React, { useState } from "react";
import style from "./MoviePage.module.css";
import { useGetSelectedGenresIds } from "./lib/hooks/useGetSelectedGenresIds";

export const MoviePage = () => {
  const type = "movie";
  const [currentPage, setCurrentPage] = useState(0);
  const { data: genres, isSuccess, isPending, isError } = useGetGenres(type);
  const { currentParam: currentSearchType } = useGetSearchParams({
    getParam: "searchType",
    defaultParam: "keyword",
  });
  const [keyWord, setKeyWord] = useState({ searchInput: "" });
  const [searchedByKeywordRes, setSearchByKeywordRes] =
    useState<ISearchByResponse>();

  const selectedGenresIds = useGetSelectedGenresIds({ isSuccess, genres });

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
    <div className={style.moviePage_container}>
      {isSearchByGenrePending && <Loader />}
      {isSearchByGenreError && <MyError />}

      <h2 className={style.pageTitle}>Movies</h2>
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

// const handleGenreClick = (e: React.SyntheticEvent) => {
//   const isAlreadySelected = selectedGenres.find(
//     (genre) => genre.name === e.currentTarget.textContent
//   );
//   if (isAlreadySelected) {
//     setSelectedGenres(
//       selectedGenres.filter((genre) => genre.id != isAlreadySelected.id)
//     );
//     // setShouldSearch(true);
//     // setCurrentPage(0);
//     return;
//   }

//   if (isSuccess) {
//     console.log(genres);
//     const findedGenre = genres.find(
//       (genre) => genre.name === e.currentTarget.textContent
//     );
//     if (findedGenre) {
//       setSelectedGenres((prevArray) => [...prevArray, findedGenre]);
//     }
//   }

// <Genres
//   handleGenreClick={handleGenreClick}
//   selectedGenres={selectedGenres}
//   genres={genres || []}
//   isLoading={isPending}
//   error={isError}
// />

//   // setShouldSearch(true);
//   // setCurrentPage(0);
// };

{
  /* {searchedByGenreRes &&
        searchedByGenreRes.results.length > 0 &&
        (selectedGenres.length > 0 || currentSearchType === "keyword") && (
          <ItemCardsList
            recievedData={searchedByGenreRes.results}
            mainType={type}
          />
        )} */
}

{
  /* {searchResult &&
        searchResult.results.length > 0 &&
        (selectedGenres.length > 0 || currentSearchType === "keyword") && (
          <ItemCardsList recievedData={searchResult.results} mainType={type} />
        )} */
}

{
  /* {searchedByGenreRes &&
        searchedByGenreRes.total_pages &&
        (selectedGenres.length > 0 || currentSearchType === "keyword") && (
          <Pagination
            totalPageCount={
              searchedByGenreRes.total_pages > 500
                ? 500
                : searchedByGenreRes.total_pages
            }
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        )} */
}
