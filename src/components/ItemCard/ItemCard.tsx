import { useState } from "react";
import style from "./ItemCard.module.css";
import {
  ICombinedCast,
  ICombinedCrew,
  IRecievedMovieData,
  IRecievedTVData,
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
  TGenresFor,
} from "../../types/models";
import { REQUEST_URLS } from "../../services/api/requestApi";
import { useNavigate } from "react-router-dom";

interface IItemCardProps {
  cardData:
    | IRecievedTVData
    | IRecievedMovieData
    | IRecievedTrendingMovieData
    | IRecievedTrendingTVData
    | ICombinedCast
    | ICombinedCrew
  mainType: TGenresFor | "";
  forPersonPage?: boolean;
}

const ItemCard = ({
  cardData,
  mainType = "",
  forPersonPage = false,
}: IItemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const img_300 = REQUEST_URLS.images.IMG_300;
  const img_200 = REQUEST_URLS.images.IMG_200;
  let year = null;
  let title = null;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onCardClick = () => {
    if (mainType === "movie") {
      navigate(`/movie/${cardData.id}`);
    }
    if (mainType === "tvSeries") {
      navigate(`/tv/${cardData.id}`);
    }
    if (mainType === "trending") {
      if ("media_type" in cardData)
        navigate(`/trending/${cardData.media_type}/${cardData.id}`);
    }
  };

  if ("release_date" in cardData && cardData.release_date != undefined) {
    year = cardData.release_date.slice(0, 4);
  } else if ("first_air_date" in cardData && cardData.first_air_date != undefined) {
    year = cardData.first_air_date.slice(0, 4);
  }

  if ("title" in cardData) {
    title = cardData.title;
  } else if ("name" in cardData) {
    title = cardData.name;
  }

  return (
    <div
      className={style.card__container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
    >
      {!forPersonPage && (
        <>
          <div className={style.img__container_w300}>
            {cardData.poster_path && (
              <img src={img_300 + cardData.poster_path} alt="" loading="lazy" />
            )}
          </div>
          <div
            className={`${style.card__infoTooltip} ${
              isHovered ? style.active : ""
            }`}
          >
            {title} {year && year.length > 0 && `(${year})`}
          </div>
        </>
      )}
      {forPersonPage && (
        <>
          <div className={style.img__container_w150}>
            {cardData.poster_path && (
              <img src={img_200 + cardData.poster_path} alt="" loading="lazy" />
            )}
          </div>
          <div
            className={`${style.card__infoTooltip} ${
              isHovered ? style.active : ""
            }`}
          >
            {title} {year && year.length > 0 && `(${year})`}{" "}
            {cardData && "character" in cardData && `as ${cardData?.character}`}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
