import { ItemCard } from "@/entities/item-card";
import {
  ICombinedCast,
  ICombinedCrew,
  IRecievedMovieData,
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
  IRecievedTVData,
  TGenresFor,
} from "@/types/models";
import style from "./ItemCardsList.module.css";
import clsx from "clsx";

//todo рефактор!

interface IItemCardsListProps {
  recievedData:
    | IRecievedTVData[]
    | IRecievedMovieData[]
    | IRecievedTrendingMovieData[]
    | IRecievedTrendingTVData[]
    | ICombinedCast[]
    | ICombinedCrew[];
  mainType: TGenresFor | "combined";
}

export const ItemCardsList = ({
  recievedData,
  mainType,
}: IItemCardsListProps) => {
  return (
    <div
      className={clsx(
        style.container,
        mainType === "combined" && style.personPageProjects
      )}
    >
      {mainType === "combined" && (
        <>
          {recievedData.map((card) => {
            if ("media_type" in card && "credit_id" in card) {
              return (
                <ItemCard
                  key={card.credit_id as string}
                  cardData={card}
                  mainType={
                    card.media_type === "tv" ? "tvSeries" : card.media_type
                  }
                  forPersonPage={true}
                />
              );
            }
          })}
        </>
      )}
      {mainType != "combined" && (
        <>
          {recievedData.map((cardData) => (
            <ItemCard
              cardData={cardData}
              mainType={mainType}
              key={cardData.id}
            />
          ))}
        </>
      )}
    </div>
  );
};
