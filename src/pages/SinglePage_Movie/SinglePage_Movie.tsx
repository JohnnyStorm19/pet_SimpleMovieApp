import { useParams } from "react-router-dom";
import { useSearchById } from "../../hooks/useSearchById";
import { useState } from "react";
import { useGetCredits } from "../../hooks/useGetCredits";
import MovieCard_Single from "../../components/MovieCard_Single/MovieCard_Single";
import style from "./SinglePage_Movie.module.css";
import Cast from "../../components/Cast/Cast";
import Crew from "../../components/Crew/Crew";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import { IRecievedMovieCard_SingleData } from "../../types/models";
import Loader from "../../components/Loader/Loader";
import MyError from "../../components/Error/MyError";

const SinglePage_Movie = () => {
  const type = "movie";
  const [shouldSearch, setShouldSearch] = useState(true);
  const [isClickedCastBtn, setIsClickeCastdBtn] = useState(true);
  const [isClickedCrewBtn, setIsClickeCrewdBtn] = useState(false);

  const { id } = useParams();
  let numberId;
  if (id) {
    numberId = Number(id);
  }

  const [{ searchResult, searchLoader, searchError }] = useSearchById(
    type,
    numberId,
    shouldSearch,
    setShouldSearch
  );
  const [{ credits, creditsLoader, creditsError }] = useGetCredits(
    type,
    numberId,
    shouldSearch,
    setShouldSearch
  );

  const handleBtnClick = (e:React.SyntheticEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "cast") {
      setIsClickeCastdBtn(true);
      setIsClickeCrewdBtn(false);
    }
    if (e.currentTarget.name === "crew") {
      setIsClickeCastdBtn(false);
      setIsClickeCrewdBtn(true);
    }
  };

  return (
    <div className={style.movieSinglePage_container}>
      <PageHeader />
      {searchLoader && <Loader />}
      {creditsLoader && <Loader />}
      {searchError && <MyError />}
      {creditsError && <MyError />}
      
      {searchResult && credits && (
        <MovieCard_Single searchResult={searchResult as IRecievedMovieCard_SingleData} credits={credits} />
      )}
      <>
        <div className={style.details_menu}>
          <button className={`${style.switcher__btn} ${isClickedCastBtn ? style.clicked : ''}`} onClick={handleBtnClick} name="cast">
            Cast
          </button>
          <button className={`${style.switcher__btn} ${isClickedCrewBtn ? style.clicked : ''}`} onClick={handleBtnClick} name="crew">
            Crew
          </button>
        </div>
        {isClickedCastBtn && <Cast type={type} />}
        {isClickedCrewBtn && <Crew type={type} />}
      </>
    </div>
  );
};

export default SinglePage_Movie;
