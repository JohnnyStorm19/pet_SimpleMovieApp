import { ItemCard } from "@/entities/item-card";
import {
  ICombinedCast,
  ICombinedCrew,
  IRecievedMovieData,
  IRecievedTVData,
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
  TGenresFor,
} from "../../types/models";
import style from "./ItemCardsList.module.css";

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

const ItemCardsList = ({ recievedData, mainType }: IItemCardsListProps) => {
  return (
    <div
      className={`${style.container} ${
        mainType === "combined" ? style.personPageProjects : ""
      }`}
    >
      {mainType === "combined"
        ? recievedData.map((card) => {
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
          })
        : recievedData.map((card) => (
            <ItemCard key={card.id} cardData={card} mainType={mainType} />
          ))}
    </div>
  );
};

export default ItemCardsList;
