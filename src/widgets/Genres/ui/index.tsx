import { Loader, MyError } from "@/shared/ui";
import { IRecievedGenres } from "@/types/models";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./Genres.module.css";

interface IGenresProps {
  genres: IRecievedGenres[];
  isSuccess: boolean;
  isPending: boolean;
  isError: boolean;
}

export const Genres = ({
  genres,
  isSuccess,
  isPending,
  isError,
}: IGenresProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGenres = useMemo((): IRecievedGenres[] => {
    const genresSelected = searchParams.get("genres");
    const genresArray = genresSelected
      ? genresSelected.split("+").map(Number)
      : [];

    if (genresArray.length > 0 && isSuccess) {
      return genres.filter((genre) => genresArray.includes(genre.id));
    }

    return [];
  }, [searchParams, genres, isSuccess]);

  const setClassName = (genre: { id: number; name: string }) => {
    const isSelected = selectedGenres.find((o) => o.id === genre.id);
    return isSelected
      ? style.genres__genreType__selected
      : style.genres__genreType;
  };

  const handleGenreClick = (genreId: number) => {
    console.log(genreId, "genreId");
    const prevGenres = new Set(searchParams.get("genres")?.split("+") || []);
    console.log(prevGenres, "prevGenres");

    if (prevGenres.has(String(genreId))) {
      prevGenres.delete(String(genreId));
    } else {
      prevGenres.add(String(genreId));
    }

    const genresString = Array.from(prevGenres).join("+");
    setSearchParams({ genres: genresString, searchType: "genre" });
  };

  return (
    <div className={style.genres__container}>
      {isPending && <Loader />}
      {isError && <MyError />}
      {genres.map((genre) => {
        const currentClassName = setClassName(genre);
        return (
          <span
            key={genre.id}
            className={currentClassName}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </span>
        );
      })}
    </div>
  );
};
