import { useEffect, useState } from "react";
import { IRecievedGenres } from "../types/models";
import axios from "axios";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";

export const useGenres = (type: "movie" | "tvSeries") => {
  const [genres, setGenres] = useState<IRecievedGenres[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGenre = async () => {
      const requestConfig = getRequestConfig({
        method: "get",
        url: REQUEST_URLS.genres[type],
      });
      try {
        setError(false);
        setIsLoading(true);

        const response = await axios(requestConfig);
        setGenres(response.data.genres);
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
    
    if (!genres.length) {
      fetchGenre();
    }

  }, [genres, type]);

  return [{ genres, isLoading, error }];
};
