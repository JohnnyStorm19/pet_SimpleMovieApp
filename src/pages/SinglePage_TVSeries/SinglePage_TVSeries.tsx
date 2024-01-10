import { useParams } from "react-router-dom";
import { useSearchById } from "../../hooks/useSearchById";
import { useState } from "react";
import { useGetCredits } from "../../hooks/useGetCredits";
import TvCard_Single from "../../components/TvCard_Single/TvCard_Single";
import style from "./SinglePage_TVSeries.module.css";
import Cast from "../../components/Cast/Cast";
import TVDetails from "../../components/TVDetails/TVDetails";
import TVSeasons from "../../components/TVDetails/TVSeasons/TVSeasons";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import { ITvCard_Single } from "../../types/models";
import Loader from "../../components/Loader/Loader";

const SinglePage_TVSeries = () => {
  const type = "tvSeries";
  const [shouldSearch, setShouldSearch] = useState(true);
  const [isClickedCastBtn, setIsClickeCastdBtn] = useState(true);
  const [isClickedDetailsBtn, setIsClickedDetailsBtn] = useState(false);
  const [isClickedSeasonsBtn, setIsClickedSeasonsBtn] = useState(false);

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
  // ? Credits используем???


  const handleBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "cast") {
      setIsClickeCastdBtn(true);
      setIsClickedDetailsBtn(false);
      setIsClickedSeasonsBtn(false);
    }
    if (e.currentTarget.name === "details") {
      setIsClickeCastdBtn(false);
      setIsClickedDetailsBtn(true);
      setIsClickedSeasonsBtn(false);
    }
    if (e.currentTarget.name === "seasons") {
      setIsClickeCastdBtn(false);
      setIsClickedDetailsBtn(false);
      setIsClickedSeasonsBtn(true);
    }
  };

  return (
    <div className={style.TVSinglePage_container}>
      <PageHeader />
      
      {searchLoader && <Loader />}
      {creditsLoader && <Loader />}

      {searchResult && credits && (
        <TvCard_Single searchResult={searchResult as ITvCard_Single} />
      )}
      <>
        <div className={style.details_menu}>
          <button className={`${style.switcher__btn} ${isClickedCastBtn ? style.clicked : ''}`} onClick={handleBtnClick} name="cast">
            Cast
          </button>
          <button className={`${style.switcher__btn} ${isClickedDetailsBtn ? style.clicked : ''}`} onClick={handleBtnClick} name="details">
            Details
          </button>
          <button className={`${style.switcher__btn} ${isClickedSeasonsBtn ? style.clicked : ''}`} onClick={handleBtnClick} name="seasons">
            Seasons
          </button>
        </div>
        {isClickedCastBtn && <Cast type={type} />}
        {isClickedDetailsBtn && <TVDetails type={type} />}
        {isClickedSeasonsBtn && <TVSeasons type={type} />}
      </>
    </div>
  );
};

export default SinglePage_TVSeries;
