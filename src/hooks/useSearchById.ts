import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import axios from "axios";
import {
  IRecievedMovieCard_SingleData,
  IRecievedPersonData,
  ITvCard_Single,
  TGenresFor,
} from "../types/models";

export const useSearchById = (
  mainType: TGenresFor | "personBio",
  id: number | undefined,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [searchResult, setSearchResult] = useState<
    IRecievedPersonData | ITvCard_Single | IRecievedMovieCard_SingleData | null
  >(null);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchedById = async () => {
      try {
        setSearchError(false);
        setSearchLoader(true);

        if (!id) return;
        let requestConfig;

        if (mainType === "personBio") {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.searchBy.personId(id),
          });
        } else {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.searchBy.id(id, mainType),
          });
        }
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

  }, [id, mainType, setShouldSearch, shouldSearch]);

  return [{ searchResult, searchLoader, searchError }];
};
