import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { TGenresFor } from "@/types/models";
import { useEffect, useState } from "react";
import { TRecievedSearchById } from "../models/search-by-id.type";
import { useParams } from "react-router-dom";

export const useSearchById = (
  mainType: TGenresFor | "personBio"
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
    // console.log("id: ", id);
    if (mainType === "personBio" && id) {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.searchBy.personId(id),
      });
    } else {
      config = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.searchBy.id(id, mainType as TGenresFor),
      });
    }
    setRequestConfig(config);
  }, [id, mainType]);

  const searchById = async (): Promise<TRecievedSearchById> => {
    // console.log("getting genres!");
    if (!requestConfigFunction) return null;
    const res = await axios(requestConfigFunction);
    return res.data;
  };

  return useQuery({
    queryKey: ["search-by-id", id],
    queryFn: searchById,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: requestConfigFunction != null,
  });
};
