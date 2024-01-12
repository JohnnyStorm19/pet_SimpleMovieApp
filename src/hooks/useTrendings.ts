import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import axios from "axios";
import { IRecievedDataFromSearching } from "../types/models";

type TPeriodSwitcher = "week" | "day";
type TContentSwitcher = "all" | "movie" | "tv";

export const useTrendings = (
  currentPage: number,
  periodSwitcherValue: TPeriodSwitcher,
  contentSwitcherValue: TContentSwitcher,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [trendingData, setTrendingData] =
    useState<IRecievedDataFromSearching | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const requestedPage = currentPage + 1;
    const controller = new AbortController();

    const fetchTrendingData = async () => {
      const requestConfig = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.trendings[contentSwitcherValue](
          periodSwitcherValue,
          requestedPage
        ),
      });
      try {
        setError(false);
        setIsLoading(true);
        const response = await axios({
          ...requestConfig,
          signal: controller.signal,
        });
        setTrendingData(response.data);
        setShouldSearch(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(true);
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldSearch) {
      fetchTrendingData();
    }

    // return () => {
    //   setIsLoading(false);
    //   setError(false);
    //   console.log('HAS CLEANED');

    //   controller.abort();
    // };
  }, [
    contentSwitcherValue,
    currentPage,
    periodSwitcherValue,
    shouldSearch,
    setShouldSearch,
  ]);

  return [{ trendingData, isLoading, error }];
};
