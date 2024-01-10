import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import { IRecievedDataFromSearching, TGenresFor, ISelectedGenre } from "../types/models";
import axios from "axios";

export const useSearchByGenres = (
  selectedGenres: ISelectedGenre[],
  mainType: TGenresFor,
  currentPage: number,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>,
  currentSearchType: string
) => {
  const [searchResult, setSearchResult] = useState<IRecievedDataFromSearching | null>(null);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const requestedPage = currentPage + 1 || 1;
    const controller = new AbortController();

    if(currentSearchType != 'genre') {
      setSearchResult(null);
    }

    const fetchSearchedByGenres = async () => {
      try {
        setSearchError(false);
        setSearchLoader(true);

        const genreIds = selectedGenres.map((genre) => genre.id);
        const requestConfig = getRequestConfig({
          method: "get",
          url: REQUEST_URLS.searchBy.genres(genreIds, mainType, requestedPage),
        });

        const response = await axios({...requestConfig, signal: controller.signal});
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

    if(shouldSearch && currentSearchType === 'genre') {
      fetchSearchedByGenres();
    }

    return () => {
      controller.abort();
    };
  }, [selectedGenres, mainType, currentPage, shouldSearch, setShouldSearch, currentSearchType]);

  return [{ searchResult, searchLoader, searchError }];
};
