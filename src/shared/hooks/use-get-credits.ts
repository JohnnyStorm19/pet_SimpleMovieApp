import { IUseGetCreditsData, TGenresFor } from "@/types/models";
import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGetCredits = (
  mainType: TGenresFor | "combined" | "aggregateTV"
  //   id: number | undefined
) => {
  const [requestConfigFunction, setRequestConfig] =
    useState<AxiosRequestConfig | null>(null);
  // console.log("page is: ", requestedPage);
  const { id: idParam } = useParams();
  const id = idParam ? Number(idParam) : undefined;

  useEffect(() => {
    if (!id) return;

    let config: typeof requestConfigFunction;
    if (mainType === "movie") {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.getCredits.movie(id),
      });
    } else if (mainType === "tvSeries") {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.getCredits.tv(id),
      });
    } else if (mainType === "aggregateTV") {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.getCredits.aggregateTV(id),
      });
    } else {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.getCredits.combinedCredits(id),
      });
    }
    setRequestConfig(config);
  }, [id, mainType]);

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
