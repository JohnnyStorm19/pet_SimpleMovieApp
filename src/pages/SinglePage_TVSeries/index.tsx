import { TvCard_Single, TVDetails, TVSeasons } from "@/entities/tv-series";
import { useSearchById } from "@/shared/hooks";
import { Loader, MyError, SwitcherBtn } from "@/shared/ui";
import { ITvCard_Single } from "@/types/models";
import { Cast } from "@/widgets";
import { useState } from "react";
import style from "./index.module.css";

//todo вынести details в widget TvSwitcher

export const SinglePage_TVSeries = () => {
  const type = "tvSeries";
  const [isClickedCastBtn, setIsClickeCastdBtn] = useState(true);
  const [isClickedDetailsBtn, setIsClickedDetailsBtn] = useState(false);
  const [isClickedSeasonsBtn, setIsClickedSeasonsBtn] = useState(false);

  const {
    data: searchResult,
    isLoading: searchLoader,
    isError: searchError,
    isSuccess: searchSuccess,
  } = useSearchById(type);

  const handleSwitch = (name: string) => {
    setIsClickeCastdBtn(name === "cast");
    setIsClickedDetailsBtn(name === "details");
    setIsClickedSeasonsBtn(name === "seasons");
  };

  return (
    <div className={style.TVSinglePage_container}>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

      {searchSuccess && (
        <TvCard_Single searchResult={searchResult as ITvCard_Single} />
      )}
      <>
        <div className={style.details_menu}>
          <SwitcherBtn
            handleBtnClick={handleSwitch}
            isClicked={isClickedCastBtn}
            name="cast"
          >
            Cast
          </SwitcherBtn>
          <SwitcherBtn
            handleBtnClick={handleSwitch}
            name="details"
            isClicked={isClickedDetailsBtn}
          >
            Details
          </SwitcherBtn>
          <SwitcherBtn
            handleBtnClick={handleSwitch}
            name="seasons"
            isClicked={isClickedSeasonsBtn}
          >
            Seasons
          </SwitcherBtn>
        </div>
        {isClickedCastBtn && <Cast key="cast" type={type} />}
        {isClickedDetailsBtn && <TVDetails key="details" />}
        {isClickedSeasonsBtn && <TVSeasons key="seasons" />}
      </>
    </div>
  );
};
