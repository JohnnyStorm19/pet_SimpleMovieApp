import {
  ICombinedCast,
  ICombinedCredits,
  ICombinedCrew,
} from "../../types/models";

type TSortedDateType = "newest" | "earliest" | "";
type TFilteredType = "all" | "movie" | "tv";

interface IgetFilteredAndSortedArrayOfCards {
  data: ICombinedCredits;
  sortType: TSortedDateType;
  filterContentType: TFilteredType;
  filterJobType: string;
}
export const getSortedByReleaseDate = (
  data: ICombinedCast[] | ICombinedCrew[],
  sortType: TSortedDateType = "newest"
) => {
  if (!data) return [];

  return [
    ...data.sort((a, b) => {
      let aDate = 0;
      let bDate = 0;
      if ("release_date" in a) {
        const tempDate = new Date(a.release_date as string).getTime();
        if (tempDate) aDate = tempDate;
      }
      if ("release_date" in b) {
        const tempDate = new Date(b.release_date as string).getTime();
        if (tempDate) bDate = tempDate;
      }
      if ("first_air_date" in a) {
        const tempDate = new Date(a.first_air_date as string).getTime();
        if (tempDate) aDate = tempDate;
      }
      if ("first_air_date" in b) {
        const tempDate = new Date(b.first_air_date as string).getTime();
        if (tempDate) bDate = tempDate;
      }
      if (sortType === "newest") {
        return bDate - aDate;
      }
      return aDate - bDate;
    }),
  ];
};

export const getFilteredByType = (
  data: (ICombinedCast | ICombinedCrew)[],
  filterType: TFilteredType = "all"
) => {
  if (!data) return [];
  if (filterType === "all") {
    return data;
  }
  return [...data.filter((item) => item.media_type === filterType)];
};

export const getFilteredByJob = (
  data: (ICombinedCast | ICombinedCrew)[],
  filterType: string
) => {
  if (!data) return [];
  return [
    ...data.filter((item) => {
      if ("job" in item) {
        return item.job === filterType && item;
      }
    }),
  ];
};

export const getFilteredAndSortedArrayOfCards = ({
  data,
  sortType,
  filterContentType,
  filterJobType,
}: IgetFilteredAndSortedArrayOfCards) => {
  let sortedArray;
  let filteredByTypeArray;
  if (!data) return [];

  if (filterJobType === "Actor") {
    sortedArray = getSortedByReleaseDate(data.cast, sortType);
    filteredByTypeArray = getFilteredByType(sortedArray, filterContentType);
    return filteredByTypeArray;
  }
  sortedArray = getSortedByReleaseDate(data.crew, sortType);
  filteredByTypeArray = getFilteredByType(sortedArray, filterContentType);
  const filteredByJob = getFilteredByJob(filteredByTypeArray, filterJobType);
  return filteredByJob;
};
