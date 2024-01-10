import { TGenresFor } from "../../types/models";
import { IRequestConfig } from "../../types/requestConfig";
import { getSearchedByIdURL } from "../utils/getSearchedByIdURL";

type TPeriod = 'day' | 'week';

export const REQUEST_URLS = {
    genres: {
        movie: '/3/genre/movie/list?language=en',
        tvSeries: '/3/genre/tv/list?language=en'
    },
    trendings: {
        all: (period: TPeriod, page: number) => `/3/trending/all/${period}?language=en-US&page=${page}`,
        movie: (period: TPeriod, page: number) => `/3/trending/movie/${period}?language=en-US&page=${page}`,
        tv: (period: TPeriod, page: number) => `/3/trending/tv/${period}?language=en-US&page=${page}`
    },
    searchBy: {
      genres: (arrayOfIds: number[], mainType: TGenresFor, page: number) => getSearchedByIdURL(arrayOfIds, mainType, page),
      keyWord: (query: string, page: number, mainType: TGenresFor) => `/3/search/${mainType === 'tvSeries' ? 'tv' : 'movie'}?query=${query}&include_adult=false&language=en-US&page=${page}`,
      id: (id: number, mainType: TGenresFor) => `/3/${mainType === 'tvSeries' ? 'tv' : 'movie'}/${id}?language=en-US`,
      personId: (id: number) => `3/person/${id}`,
      similar: (id: number) => `3/movie/${id}/similar`
    },
    getCredits: {
      movie: (id: number) => `3/movie/${id}/credits?language=en-US`,
      tv: (id: number) => `3/tv/${id}/credits?language=en-US`,
      aggregateTV: (id: number) => `3/tv/${id}/aggregate_credits`,
      combinedCredits: (id: number) => `3/person/${id}/combined_credits`
    },
    images: {
      IMG_200: "https://image.tmdb.org/t/p/w200",
      IMG_300: "https://image.tmdb.org/t/p/w300",
      IMG_500: "https://image.tmdb.org/t/p/w500",
      FACE_IMG: "https://image.tmdb.org/t/p/w300/t/p/w138_and_h175_face",
      BACKDROP: "https://image.tmdb.org/t/p/original",
      getImages: (id: number, mainType: TGenresFor) => `/3/${mainType === 'tvSeries' ? 'tv' : 'movie'}/${id}/images`
    }
}

export const getRequestConfig = ({ method, url }: IRequestConfig) => {
    
  return {
    method: method,
    baseURL: "https://api.themoviedb.org",
    url: url,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDc0Y2E3MjNiZjc4M2IwZjk1NTRkNjQ2MzVkMmE5ZCIsInN1YiI6IjY1NzliNTBkMzVhNjFlMDBjNjM0ZjBmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gtC9Ki_Ru_LVbc_D3vxbgJ-YtPAwhBWuVnKmKPgoSWQ",
    },
  };
};
