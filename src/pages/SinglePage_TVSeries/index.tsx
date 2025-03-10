import { TvCard_Single, TVDetails, TVSeasons } from "@/entities/tv-series";
import { DetailsSwitcher } from "@/features";
import { useGetSearchParams, useSearchById } from "@/shared/hooks";
import { Loader, MyError } from "@/shared/ui";
import { ITvCard_Single } from "@/types/models";
import { Cast } from "@/widgets";
import style from "./index.module.css";

export const SinglePage_TVSeries = () => {
  const type = "tvSeries";
  const { currentParam, setCurrentParam, setSearchParams } = useGetSearchParams<
    "cast" | "details" | "seasons"
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

  const handleBtnClick = (name: "cast" | "details" | "seasons") => {
    setCurrentParam(name);
    setSearchParams({ details: name });
  };

  return (
    <div className={style.TVSinglePage_container}>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

      {searchSuccess && (
        <TvCard_Single searchResult={searchResult as ITvCard_Single} />
      )}

      <DetailsSwitcher
        activeSwitcher={currentParam}
        onSwitch={handleBtnClick}
        options={[
          { value: "cast", label: "Cast" },
          { value: "details", label: "Details" },
          { value: "seasons", label: "Seasons" },
        ]}
      />
      {currentParam === "cast" && <Cast key="cast" type={type} />}
      {currentParam === "details" && <TVDetails key="details" />}
      {currentParam === "seasons" && <TVSeasons key="seasons" />}
    </div>
  );
};
