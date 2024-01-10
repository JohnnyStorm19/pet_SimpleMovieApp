import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";

import axios from "axios";
import { IUseGetCreditsData, TGenresFor } from "../types/models";

export const useGetCredits = (
  mainType: TGenresFor | 'combined' | 'aggregateTV',
  id: number | undefined,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [credits, setCredits] = useState<IUseGetCreditsData | null>(null);
  const [creditsLoader, setCreditsLoader] = useState(false);
  const [creditsError, setCreditsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCredits = async () => {
      try {
        setCreditsError(false);
        setCreditsLoader(true);

        if (!id) return;

        let requestConfig;
        if (mainType === "movie") {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.getCredits.movie(id),
          });
        } else if (mainType === "tvSeries") {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.getCredits.tv(id),
          });
        } else if (mainType === "aggregateTV") {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.getCredits.aggregateTV(id),
          });
        } else if (mainType === "combined") {
          requestConfig = getRequestConfig({
            method: "get",
            url: REQUEST_URLS.getCredits.combinedCredits(id),
          });
        }

        const response = await axios({
          ...requestConfig,
          signal: controller.signal,
        });
        setCredits(response.data);
        setShouldSearch(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setCreditsError(true);
        } else {
          console.error(error);
        }
      } finally {
        setCreditsLoader(false);
      }
    };

    if (shouldSearch) {
      fetchCredits();
    }
  }, [id, mainType, setShouldSearch, shouldSearch]);

  return [{ credits, creditsLoader, creditsError }];
};
