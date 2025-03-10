import {
  ICombinedCast,
  ICombinedCrew,
  IRecievedMovieData,
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
  IRecievedTVData,
  TGenresFor,
} from "@/types/models";
import cls from "clsx";
import style from "./ItemCard.module.css";
import { useItemCard } from "../lib/hooks/useItemCard";

interface IItemCardProps {
  cardData:
    | IRecievedTVData
    | IRecievedMovieData
    | IRecievedTrendingMovieData
    | IRecievedTrendingTVData
    | ICombinedCast
    | ICombinedCrew;
  mainType: TGenresFor | "";
  forPersonPage?: boolean;
}

export const ItemCard = ({
  cardData,
  mainType = "",
  forPersonPage = false,
}: IItemCardProps) => {
  const {
    handleMouseEnter,
    handleMouseLeave,
    img_200,
    img_300,
    isHovered,
    onCardClick,
    title,
    year,
  } = useItemCard({ mainType, cardData });

  return (
    <div
      className={style.card__container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
    >
      <>
        <div
          className={cls(
            !forPersonPage
              ? style.img__container_w300
              : style.img__container_w150
          )}
        >
          {cardData.poster_path && forPersonPage && (
            <img src={img_300 + cardData.poster_path} alt="" loading="lazy" />
          )}
          {cardData.poster_path && !forPersonPage && (
            <img src={img_200 + cardData.poster_path} alt="" loading="lazy" />
          )}
        </div>

        <div
          className={cls(style.card__infoTooltip, isHovered && style.active)}
        >
          {title} {year && year.length > 0 && `(${year})`}
          {!forPersonPage &&
            cardData &&
            "character" in cardData &&
            `as ${cardData?.character}`}
        </div>
      </>
    </div>
  );
};
