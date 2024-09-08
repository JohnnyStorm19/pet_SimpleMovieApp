import { IRecievedGenres } from "@/types/models";
import style from "./Genres.module.css";
import { Loader, MyError } from "@/shared/ui";
import { useGetGenres } from "../hooks/use-get-genres";
import { TContentType } from "@/shared/models/TContentType";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

interface IGenresProps {
  contentType: TContentType;
}

export const Genres = ({ contentType }: IGenresProps) => {
  const {
    data: genres,
    isPending,
    isError,
    isSuccess,
  } = useGetGenres(contentType);
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
    // Получаем текущие выбранные жанры из URL
    const prevGenres = new Set(searchParams.get("genres")?.split("+") || []);
    console.log(prevGenres, "prevGenres");

    // Добавляем или удаляем жанр
    if (prevGenres.has(String(genreId))) {
      prevGenres.delete(String(genreId));
    } else {
      prevGenres.add(String(genreId));
    }

    // Преобразуем Set обратно в строку и обновляем URL параметры
    const genresString = Array.from(prevGenres).join("+");

    // Устанавливаем обновленный список жанров в URL
    setSearchParams({ genres: genresString, searchType: "genre" });
  };

  return (
    <div className={style.genres__container}>
      {isPending && <Loader />}
      {isError && <MyError />}
      {isSuccess &&
        genres.map((genre) => {
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
