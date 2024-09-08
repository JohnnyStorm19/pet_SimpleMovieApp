import { getRequestConfig, REQUEST_URLS } from "@/services/api/requestApi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TGenresFor } from "@/types/models";
import { ISearchByResponse } from "../models/search-by-response.interface";

export const useSearchByKeyword = (
  keyWord: string,
  mainType: TGenresFor,
  requestedPage: number
) => {
  // console.log("page is: ", requestedPage);
  const requestConfig = getRequestConfig({
    method: "get",
    url: REQUEST_URLS.searchBy.keyWord(keyWord, requestedPage + 1, mainType),
  });

  const searchByKeyword = async (): Promise<ISearchByResponse> => {
    // console.log("searchByKeyword!");
    const res = await axios(requestConfig);
    console.log(res.data);
    return res.data;
  };

  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: searchByKeyword,
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: ["userLogout"] });
    //   },
  });

  //   return useQuery({
  //     queryKey: ["search-by-keyword", requestedPage],
  //     queryFn: searchByKeyword,
  //     staleTime: Infinity,
  //     gcTime: 5 * 60 * 1000,
  //     enabled: keyWord.length > 0,
  //   });
};
