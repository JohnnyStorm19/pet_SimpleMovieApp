import { IUseGetCreditsData, TGenresFor } from "@/types/models";
import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

type MainType = Extract<TGenresFor, "movie" | "tvSeries"> | "combined" | "aggregateTV";

export const useGetCredits = (
  mainType: MainType
) => {
  const [requestConfigFunction, setRequestConfig] =
    useState<AxiosRequestConfig | null>(null);
  // console.log("page is: ", requestedPage);
  const { id: idParam } = useParams();
  const id = idParam ? Number(idParam) : undefined;

  const createRequestConfig = useCallback(() => {
    if (!id) return null;

    const urlMap: Record<MainType, string> = {
      movie: REQUEST_URLS.getCredits.movie(id),
      tvSeries: REQUEST_URLS.getCredits.tv(id),
      aggregateTV: REQUEST_URLS.getCredits.aggregateTV(id),
      combined: REQUEST_URLS.getCredits.combinedCredits(id),
    };

    return getRequestConfig({
      method: "get",
      url: urlMap[mainType],
    });
  }, [id, mainType]);

  useEffect(() => {
    setRequestConfig(createRequestConfig());
  }, [createRequestConfig]);

  const getCredits = async (): Promise<IUseGetCreditsData | null> => {
    if (requestConfigFunction === null) return null;
    const res = await axios(requestConfigFunction);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-credits", mainType, id],
    queryFn: getCredits,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: requestConfigFunction != null,
    // gcTime: 5 * 60 * 1000,
  });
};
