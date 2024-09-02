import { useEffect, useState } from "react";
import { REQUEST_URLS, getRequestConfig } from "../services/api/requestApi";
import { TGenresFor } from "../types/models";
import axios from "axios";

export const useGetImages = (
  mainType: TGenresFor,
  id: number,
  shouldSearch: boolean,
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [images, setImages] = useState<unknown | null>(null);
  const [imagesLoader, setImagesLoader] = useState(false);
  const [imagesError, setImagesError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchImages = async () => {
      try {
        setImagesLoader(true);
        setImagesError(false);

        const requestConfig = getRequestConfig({
          method: "get",
          url: REQUEST_URLS.images.getImages(id, mainType),
        });

        const response = await axios({
          ...requestConfig,
          signal: controller.signal,
        });
        setImages(response.data);
        setShouldSearch(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setImagesError(true);
        } else {
          console.error(error);
        }
      } finally {
        setImagesLoader(false);
      }
    };

    if (shouldSearch) {
      fetchImages();
    }

    return () => {
      controller.abort();
    };
  }, [id, mainType, setShouldSearch, shouldSearch]);

  return [{ images, imagesLoader, imagesError }];
};
