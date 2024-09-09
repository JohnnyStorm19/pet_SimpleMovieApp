import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IRecievedGenres } from "@/types/models";
import { TContentType } from "@/shared/models/content-type.type";

export const useGetGenres = (type: TContentType) => {
  const requestConfig = getRequestConfig({
    method: "get",
    url: REQUEST_URLS.genres[type],
  });

  const getGenres = async (): Promise<IRecievedGenres[]> => {
    // console.log("getting genres!");
    const res = await axios(requestConfig);
    return res.data.genres;
  };

  return useQuery({
    queryKey: ["get-genres", type],
    queryFn: getGenres,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
};
