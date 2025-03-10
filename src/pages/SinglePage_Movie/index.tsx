import { MovieCard_Single } from "@/entities/movie/ui/SingleCard";
import { DetailsSwitcher } from "@/features";
import {
  useGetCredits,
  useGetSearchParams,
  useSearchById,
} from "@/shared/hooks";
import { Loader, MyError } from "@/shared/ui";
import { IRecievedMovieCard_SingleData } from "@/types/models";
import { Cast, Crew } from "@/widgets";
import style from "./SinglePage_Movie.module.css";

export const SinglePage_Movie = () => {
  const type = "movie";

  const { currentParam, setCurrentParam, setSearchParams } = useGetSearchParams<
    "cast" | "crew"
  >({
    getParam: "details",
    defaultParam: "cast",
  });

  const {
    data: searchResult,
    isLoading: searchLoader,
    isError: searchError,
    isSuccess: searchSuccess,
  } = useSearchById(type);

  const {
    data: credits,
    isLoading: creditsLoader,
    isError: creditsError,
    isSuccess: creditsSuccess,
  } = useGetCredits(type);

  const handleBtnClick = (name: "cast" | "crew") => {
    setCurrentParam(name);
    setSearchParams({ details: name });
  };

  return (
    <div className={style.movieSinglePage_container}>
      {(searchLoader || creditsLoader) && <Loader />}
      {(searchError || creditsError) && <MyError />}

      {searchSuccess && creditsSuccess && credits && (
        <MovieCard_Single
          searchResult={searchResult as IRecievedMovieCard_SingleData}
          credits={credits}
        />
      )}
      
      <DetailsSwitcher
        activeSwitcher={currentParam}
        onSwitch={handleBtnClick}
        options={[
          { value: "cast", label: "Cast" },
          { value: "crew", label: "Crew" },
        ]}
      />

      {currentParam === "cast" && <Cast type={type} />}
      {currentParam === "crew" && <Crew type={type} />}
    </div>
  );
};
