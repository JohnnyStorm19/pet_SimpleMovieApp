import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import {
  IRecievedDataFromSearching,
  TGenresFor,
  ISelectedGenre,
} from "../types/models";
import axios from "axios";

const getSearchingId = (
  type: string,
  mainType: TGenresFor,
  requestedPage: number,
  selectedGenres: ISelectedGenre[] | [] = [],
  keyWord: string
) => {
  if (type === "genre") {
    const genreIds = selectedGenres.map((genre) => genre.id);
    const requestConfig = getRequestConfig({
      method: "get",
      url: REQUEST_URLS.searchBy.genres(genreIds, mainType, requestedPage),
    });
    return requestConfig;
  }

  if (type === "keyword") {
    const requestConfig = getRequestConfig({
      method: "get",
      url: REQUEST_URLS.searchBy.keyWord(keyWord, requestedPage, mainType),
    });
    return requestConfig;
  }
};

export const useSearchBy = (
  selectedGenres: ISelectedGenre[] | [] = [],
  keyWord: string = "",
  mainType: TGenresFor,
  currentPage: number,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>,
  currentSearchType: string
) => {
  const [searchResult, setSearchResult] =
    useState<IRecievedDataFromSearching | null>(null);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hookSearchType, setHookSearchType] = useState("keyword");

  useEffect(() => {
    const requestedPage = currentPage + 1;
    const controller = new AbortController();

    if (currentSearchType != hookSearchType) {
      setSearchResult(null);
      setHookSearchType(currentSearchType);
    }

    const fetchSearchedByGenres = async () => {
      try {
        setSearchError(false);
        setSearchLoader(true);

        const requestConfig = getSearchingId(
          currentSearchType,
          mainType,
          requestedPage,
          selectedGenres,
          keyWord
        );

        const response = await axios({
          ...requestConfig,
          signal: controller.signal,
        });
        setSearchResult(response.data);
        setShouldSearch(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setSearchError(true);
        } else {
          console.error(error);
        }
      } finally {
        setSearchLoader(false);
      }
    };

    if (shouldSearch) {
      fetchSearchedByGenres();
    }

    return () => {
      controller.abort();
    };
  }, [currentPage, currentSearchType, hookSearchType, keyWord, mainType, selectedGenres, setShouldSearch, shouldSearch]);

  return [{ searchResult, searchLoader, searchError }];
};
