import MovieCard_Single from "@/components/MovieCard_Single/MovieCard_Single";
import {
  useGetCredits,
  useGetSearchParams,
  useSearchById,
} from "@/shared/hooks";
import { Loader, MyError, SwitcherBtn } from "@/shared/ui";
import { IRecievedMovieCard_SingleData } from "@/types/models";
import { Cast, Crew } from "@/widgets";
import style from "./SinglePage_Movie.module.css";

export const SinglePage_Movie = () => {
  const type = "movie";

  const { currentParam, setCurrentParam, setSearchParams } = useGetSearchParams(
    { getParam: "details", defaultParam: "cast" }
  );

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

  const handleBtnClick = (name: string) => {
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
      <>
        <div className={style.details_menu}>
          <SwitcherBtn
            handleBtnClick={() => handleBtnClick("cast")}
            isClicked={currentParam === "cast"}
          >
            Cast
          </SwitcherBtn>
          <SwitcherBtn
            handleBtnClick={() => handleBtnClick("crew")}
            isClicked={currentParam === "crew"}
          >
            Crew
          </SwitcherBtn>
        </div>
        {currentParam === "cast" && <Cast type={type} />}
        {currentParam === "crew" && <Crew type={type} />}
      </>
    </div>
  );
};
