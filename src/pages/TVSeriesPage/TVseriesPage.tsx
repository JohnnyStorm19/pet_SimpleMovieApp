import Genres from "../../components/Genres/Genres";
import { useGenres } from "../../hooks/useGenres";
import React, { useState } from "react";
import { IFormData, ISelectedGenre } from "../../types/models";
import Pagination from "../../components/UI/Pagination/Pagination";
import ItemCardsList from "../../components/ItemCardsList/ItemCardsList";
import SearchWidget from "../../components/SearchWidget/SearchWidget";
import SearchSwitcher from "../../components/UI/SearchSwitcher/SearchSwitcher";
import { useSearchBy } from "../../hooks/useSearchBy";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import style from "./TVseriesPage.module.css";
import Loader from "../../components/Loader/Loader";

const TVseriesPage = () => {
  const type = "tvSeries";

  const [currentPage, setCurrentPage] = useState(0);
  const [currentSearchType, setCurrentSearchType] = useState("keyword");
  const [{ genres, isLoading, error }] = useGenres(type);
  const [selectedGenres, setSelectedGenres] = useState<ISelectedGenre[] | []>(
    []
  );
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

  const handleSearchSwitcher = (type: string) => {
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
    const findedGenre = genres.find(
      (genre) => genre.name === e.currentTarget.textContent
    );
    if (findedGenre) {
      setSelectedGenres((prevArray) => [...prevArray, findedGenre]);
    }
    setShouldSearch(true);
    setCurrentPage(0);
  };

  return (
    <div className={style.tv_container}>
      {searchLoader && <Loader />}
      <PageHeader />
      <header className={style.header}>
        <h2 className={style.pageTitle}>Serials / TV-shows</h2>
      </header>
      <SearchSwitcher handleSearchSwitcher={handleSearchSwitcher} />

      {currentSearchType === "keyword" && (
        <SearchWidget onFormSubmit={handleSubmitForm} />
      )}

      {currentSearchType === "genre" && (
        <Genres
          handleGenreClick={handleGenreClick}
          selectedGenres={selectedGenres}
          genres={genres}
          isLoading={isLoading}
          error={error}
        />
      )}

      {searchResult && searchResult.results.length > 0 && (selectedGenres.length > 0 || currentSearchType === 'keyword') && (
        <ItemCardsList recievedData={searchResult.results} mainType={type} />
      )}

      {searchResult && searchResult.total_pages && (selectedGenres.length > 0 || currentSearchType === 'keyword') && (
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

export default TVseriesPage;
