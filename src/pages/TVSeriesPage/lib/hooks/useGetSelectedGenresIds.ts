import { IRecievedGenres } from "@/types/models";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetSelectedGenresIds = ({
  isSuccess,
  genres,
}: {
  isSuccess: boolean;
  genres: IRecievedGenres[] | undefined;
}) => {
  const [searchParams] = useSearchParams();

  return useMemo((): number[] => {
    const genresSelected = searchParams.get("genres");
    const genresArray = genresSelected
      ? genresSelected.split("+").map(Number)
      : [];

    if (genresArray.length > 0 && isSuccess) {
      const genresAreNotUndefined = !genres ? [] : genres;
      return genresAreNotUndefined
        .filter((genre) => genresArray.includes(genre.id))
        .map((genre) => genre.id);
    }

    return [];
  }, [searchParams, genres, isSuccess]);
};
