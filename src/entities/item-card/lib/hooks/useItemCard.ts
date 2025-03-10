import { REQUEST_URLS } from "@/shared/api/requestApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IItemCardProps } from "../../model/IItemCardProps.interface";

export type IUseItemCardProps = Pick<IItemCardProps, "cardData" | "mainType">;

export const useItemCard = ({ mainType, cardData }: IUseItemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [year, setYear] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ("release_date" in cardData && cardData.release_date != undefined) {
      setYear(cardData.release_date.slice(0, 4));
    } else if (
      "first_air_date" in cardData &&
      cardData.first_air_date != undefined
    ) {
      setYear(cardData.first_air_date.slice(0, 4));
    }

    if ("title" in cardData) {
      setTitle(cardData.title);
    } else if ("name" in cardData) {
      setTitle(cardData.name);
    }
  }, [cardData]);

  const img_300 = REQUEST_URLS.images.IMG_300;
  const img_200 = REQUEST_URLS.images.IMG_200;

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

  return {
    isHovered,
    year,
    title,
    handleMouseEnter,
    handleMouseLeave,
    onCardClick,
    img_300,
    img_200,
  };
};
