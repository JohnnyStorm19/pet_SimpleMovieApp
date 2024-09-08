import { IRecievedMovieData, IRecievedTVData } from "@/types/models";

export interface ISearchByResponse {
  page: number;
  results: IRecievedTVData[] | IRecievedMovieData[];
  total_pages: number;
  total_results: number;
}
