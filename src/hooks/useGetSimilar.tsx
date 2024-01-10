import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import axios from "axios";
import {
  IRecievedDataFromSearching,
} from "../types/models";

export const useGetSimilar = (
  id: number | undefined,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [searchResult, setSearchResult] =
    useState<IRecievedDataFromSearching | null>(null);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchedById = async () => {
      try {
        setSearchError(false);
        setSearchLoader(true);

        if (!id) return;
        const requestConfig = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.searchBy.similar(id)
        });

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
      fetchSearchedById();
    }
  }, [id, setShouldSearch, shouldSearch]);

  return [{ searchResult, searchLoader, searchError }];
};
