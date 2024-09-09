import { IRecievedMovieData, IRecievedTVData } from "@/types/models";
import { BaseContentResponse } from "./base-content-response.interface";

export interface ISearchByResponse extends BaseContentResponse {
  results: IRecievedTVData[] | IRecievedMovieData[];
}
