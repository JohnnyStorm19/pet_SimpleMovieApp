import { ISelectedGenre } from "../../types/models";
import MyError from "../Error/MyError";
import Loader from "../Loader/Loader";
import style from "./Genres.module.css";

interface IGenresProps {
  handleGenreClick: (e: React.SyntheticEvent) => void;
  selectedGenres: [] | ISelectedGenre[];
  genres: [] | ISelectedGenre[];
  isLoading: boolean;
  error: boolean;
}

const Genres = ({
  handleGenreClick,
  selectedGenres,
  genres,
  isLoading,
  error,
}: IGenresProps) => {
  const setClassName = (genre: { id: number; name: string }) => {
    const isSelected = selectedGenres.find((o) => o.id === genre.id);
    return isSelected
      ? style.genres__genreType__selected
      : style.genres__genreType;
  };

  return (
    <div className={style.genres__container}>
      {isLoading && <Loader />}
      {error && <MyError />}
      {genres &&
        genres.length > 0 &&
        genres.map((genre) => {
          const currentClassName = setClassName(genre);
          return (
            <span
              key={genre.id}
              className={currentClassName}
              onClick={handleGenreClick}
            >
              {genre.name}
            </span>
          );
        })}
    </div>
  );
};

export default Genres;
