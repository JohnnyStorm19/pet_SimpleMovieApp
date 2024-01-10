import { useEffect, useState } from "react";
import { IRecievedDataFromSearching, TGenresFor } from "../types/models";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import axios from "axios";

export const useSearchByKeyWord = (
  mainType: TGenresFor,
  currentPage: number,
  keyWord: string,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>,
  currentSearchType: string
) => {
  const [searchByKeyWordResult, setSearchByKeyWordResult] = useState<IRecievedDataFromSearching | null>(null);
  const [searchByKeyWordLoader, setSearchByKeyWordLoader] = useState(false);
  const [searchByKeyWordError, setSearchByKeyWordError] = useState(false);

  useEffect(() => {
    const requestedPage = currentPage + 1 || 1;
    const controller = new AbortController();

    if(currentSearchType != 'keyword') {
      setSearchByKeyWordResult(null);
    }

    //! если currentSearchType != тайпу в state, тогда обнуляемся

    const fetchSearchedByKeyWord = async () => {
      console.log('FIRES SEARCHING BY KEYWORD')
      try {
        setSearchByKeyWordError(false);
        setSearchByKeyWordLoader(true);

        const requestConfig = getRequestConfig({
          method: "get",
          url: REQUEST_URLS.searchBy.keyWord(keyWord, requestedPage, mainType),
        });

        const response = await axios({
          ...requestConfig,
          signal: controller.signal,
        });

        setSearchByKeyWordResult(response.data);
        setShouldSearch(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setSearchByKeyWordError(true);
        } else {
          console.error(error);
        }
      } finally {
        setSearchByKeyWordLoader(false);
      }
    };

    if(shouldSearch && currentSearchType === 'keyword') {
      fetchSearchedByKeyWord();
    }

    return () => {
      controller.abort();
    };
  }, [currentPage, currentSearchType, keyWord, mainType, setShouldSearch, shouldSearch]);

  return [{ searchByKeyWordResult, searchByKeyWordLoader, searchByKeyWordError }];
};
