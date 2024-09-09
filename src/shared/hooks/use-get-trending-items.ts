import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import {
  TContentSwitcher,
  TPeriodSwitcher,
} from "../models/content-switcher.type";
import axios from "axios";
import { ITrendingItemsResponse } from "../models/trending-items-from-response.interface";
import { useQuery } from "@tanstack/react-query";

interface IUseGetTrendingItems {
  contentSwitcherValue: TContentSwitcher;
  periodSwitcherValue: TPeriodSwitcher;
  currentPage: number;
}

export const useGetTrendingItems = ({
  contentSwitcherValue,
  periodSwitcherValue,
  currentPage,
}: IUseGetTrendingItems) => {
  const requestConfig = getRequestConfig({
    method: "get",
    url: REQUEST_URLS.trendings[contentSwitcherValue](
      periodSwitcherValue,
      currentPage + 1
    ),
  });

  const getTrendingItems = async (): Promise<ITrendingItemsResponse> => {
    const res = await axios(requestConfig);
    return res.data;
  };

  return useQuery({
    queryKey: [
      "trending-items",
      periodSwitcherValue,
      currentPage,
      contentSwitcherValue,
    ],
    queryFn: getTrendingItems,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
};
