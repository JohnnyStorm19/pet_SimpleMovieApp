import {
  ICombinedCast,
  ICombinedCrew,
  IRecievedMovieData,
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
  IRecievedTVData,
  TGenresFor,
} from "@/types/models";

export interface IItemCardProps {
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
