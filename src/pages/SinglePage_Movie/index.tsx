import MovieCard_Single from "@/components/MovieCard_Single/MovieCard_Single";
import { useGetCredits, useSearchById } from "@/shared/hooks";
import { Loader, MyError, SwitcherBtn } from "@/shared/ui";
import { IRecievedMovieCard_SingleData } from "@/types/models";
import { Cast, Crew } from "@/widgets";
import { useState } from "react";
import style from "./SinglePage_Movie.module.css";

export const SinglePage_Movie = () => {
  const type = "movie";
  const [isClickedCastBtn, setIsClickeCastdBtn] = useState(true);
  const [isClickedCrewBtn, setIsClickeCrewdBtn] = useState(false);

  //todo сделай переключения в url

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
    setIsClickeCastdBtn(name === "cast");
    setIsClickeCrewdBtn(name === "crew");
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
            isClicked={isClickedCastBtn}
          >
            Cast
          </SwitcherBtn>
          <SwitcherBtn
            handleBtnClick={() => handleBtnClick("crew")}
            isClicked={isClickedCrewBtn}
          >
            Crew
          </SwitcherBtn>
        </div>
        {isClickedCastBtn && <Cast type={type} />}
        {isClickedCrewBtn && <Crew type={type} />}
      </>
    </div>
  );
};
