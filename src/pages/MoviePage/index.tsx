import Genres from "@/components/Genres/Genres";
import ItemCardsList from "@/components/ItemCardsList/ItemCardsList";
import SearchWidget from "@/components/SearchWidget/SearchWidget";
import Pagination from "@/components/UI/Pagination/Pagination";
// import { useGenres } from "@/hooks/useGenres";
import { useSearchBy } from "@/hooks/useSearchBy";
import { SearchSwitcher } from "@/shared/ui";
import { IFormData, ISelectedGenre } from "@/types/models";
import React, { useState } from "react";
import MyError from "@/components/Error/MyError";
import { TSearchSwitcher } from "@/shared/models/TSearchSwitcher.type";
import { Loader } from "@/shared/ui";
import style from "./MoviePage.module.css";
import { useGetGenres } from "@/shared/hooks/use-get-genres";

// todo прикрутить query-hook, полностью пересмотреть отправку запросов на поиск
// todo разделить хуки use-search-by-name / use-search-by-genre

export const MoviePage = () => {
  const type = "movie";

  const [currentPage, setCurrentPage] = useState(0);
  const [currentSearchType, setCurrentSearchType] = useState("keyword");
  const { data: genres, isPending, isError, isSuccess } = useGetGenres(type);
  // const [{ genres, isLoading, error }] = useGenres(type);
  const [selectedGenres, setSelectedGenres] = useState<ISelectedGenre[]>([]);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [keyWord, setKeyWord] = useState({ searchInput: "" });

  const [{ searchResult, searchLoader, searchError }] = useSearchBy(
    selectedGenres,
    keyWord.searchInput,
    type,
    currentPage,
    shouldSearch,
    setShouldSearch,
    currentSearchType
  );

  const handlePageClick = (e: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(e.selected);
    setShouldSearch(true);
  };

  const handleSubmitForm = (formData: IFormData) => {
    setKeyWord(formData);
    setShouldSearch(true);
    setCurrentPage(0);
  };

  const handleSearchSwitcher = (type: TSearchSwitcher) => {
    setCurrentSearchType(type);
    setShouldSearch(false);
    setSelectedGenres([]);
    setCurrentPage(0);
  };

  const handleGenreClick = (e: React.SyntheticEvent) => {
    const isAlreadySelected = selectedGenres.find(
      (genre) => genre.name === e.currentTarget.textContent
    );
    if (isAlreadySelected) {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre.id != isAlreadySelected.id)
      );
      setShouldSearch(true);
      setCurrentPage(0);
      return;
    }

    if (isSuccess) {
      console.log(genres);
      const findedGenre = genres.find(
        (genre) => genre.name === e.currentTarget.textContent
      );
      if (findedGenre) {
        setSelectedGenres((prevArray) => [...prevArray, findedGenre]);
      }
    }

    setShouldSearch(true);
    setCurrentPage(0);
  };

  return (
    <div className={style.moviePage_container}>
      {searchLoader && <Loader />}
      {searchError && <MyError />}
      <h2 className={style.pageTitle}>Movies</h2>
      <SearchSwitcher handleSearchSwitcher={handleSearchSwitcher} />

      {currentSearchType === "keyword" && (
        <SearchWidget onFormSubmit={handleSubmitForm} />
      )}

      {currentSearchType === "genre" && isSuccess && (
        <Genres
          handleGenreClick={handleGenreClick}
          selectedGenres={selectedGenres}
          genres={genres || []}
          isLoading={isPending}
          error={isError}
        />
      )}

      {searchResult &&
        searchResult.results.length > 0 &&
        (selectedGenres.length > 0 || currentSearchType === "keyword") && (
          <ItemCardsList recievedData={searchResult.results} mainType={type} />
        )}

      {searchResult &&
        searchResult.total_pages &&
        (selectedGenres.length > 0 || currentSearchType === "keyword") && (
          <Pagination
            totalPageCount={
              searchResult.total_pages > 500 ? 500 : searchResult.total_pages
            }
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        )}
    </div>
  );
};
