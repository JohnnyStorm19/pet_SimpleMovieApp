import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TGenresFor } from "@/types/models";
import { ISearchByResponse } from "../models/search-by-response.interface";

export const useSearchByGenre = (
  genreIds: number[],
  mainType: TGenresFor,
  requestedPage: number
) => {
  // console.log("page is: ", requestedPage);
  const requestConfig = getRequestConfig({
    method: "get",
    url: REQUEST_URLS.searchBy.genres(genreIds, mainType, requestedPage + 1),
  });

  const searchByGenre = async (): Promise<ISearchByResponse> => {
    // console.log("getting genres!");
    const res = await axios(requestConfig);
    // console.log(res.data);
    return res.data;
  };

  return useQuery({
    queryKey: ["search-by-genre", requestedPage, genreIds],
    queryFn: searchByGenre,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    enabled: genreIds.length > 0,
  });
};
