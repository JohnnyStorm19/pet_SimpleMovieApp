import { TGenresFor } from "@/types/models";

export const getSearchedByIdURL = (arrayOfIds: number[], mainType: TGenresFor, page: number) => {
    const stringPage = String(page);
    const genres = arrayOfIds.map((id, index, array) => {
      const stringId = String(id);
      if (index === array.length - 1) {
        return stringId
      }
      return stringId + "%2C";
    });
    const res = `/3/discover/${mainType === 'tvSeries' ? 'tv' : 'movie'}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${stringPage}&sort_by=popularity.desc&with_genres=${genres.join('')}`;
    return res;
  };