import {
  IRecievedMovieCard_SingleData,
  IRecievedPersonData,
  ITvCard_Single,
} from "@/types/models";

export type TRecievedSearchById =
  | IRecievedPersonData
  | ITvCard_Single
  | IRecievedMovieCard_SingleData
  | null;
