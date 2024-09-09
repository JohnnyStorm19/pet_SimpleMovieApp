import {
  IRecievedTrendingMovieData,
  IRecievedTrendingTVData,
} from "@/types/models";
import { BaseContentResponse } from "./base-content-response.interface";

export interface ITrendingItemsResponse extends BaseContentResponse {
  results: IRecievedTrendingMovieData[] | IRecievedTrendingTVData[];
}
