import { getFilteredAndSortedArrayOfCards } from "@/services/utils/getSortedAndFilteredBy";
import {
  ICombinedCast,
  ICombinedCrew,
  IUseGetCreditsData,
} from "@/types/models";
import { useState } from "react";
import { TContentType, TProjectTime } from "../../model/types";
import { getPersonsJob } from "@/services/utils/getPersonsJob";

interface IUseGetPersonPageData {
  credits: IUseGetCreditsData | null;
}

export const useGetPersonPageData = ({ credits }: IUseGetPersonPageData) => {
  const [sortByJob, setSortByJob] = useState("");
  const [sortByProjectTime, setSortByProjectTime] = useState<
    "newest" | "earliest" | ""
  >("newest");
  const [sortByContentType, setSortByContentType] = useState<
    "movie" | "tv" | "all"
  >("all");
  const cardsListDataByActorFiltered = getFilteredAndSortedArrayOfCards({
    data: {
      cast: credits?.cast as ICombinedCast[],
      crew: credits?.crew as ICombinedCrew[],
    },
    sortType: sortByProjectTime,
    filterContentType: sortByContentType,
    filterJobType: "Actor",
  }) as ICombinedCrew[] | ICombinedCast[];

  const cardsListDataByOthersFiltered = getFilteredAndSortedArrayOfCards({
    data: {
      cast: credits?.cast as ICombinedCast[],
      crew: credits?.crew as ICombinedCrew[],
    },
    sortType: sortByProjectTime,
    filterContentType: sortByContentType,
    filterJobType: sortByJob,
  }) as ICombinedCrew[] | ICombinedCast[];

  const projectCount = getFilteredAndSortedArrayOfCards({
    data: {
      cast: credits?.cast as ICombinedCast[],
      crew: credits?.crew as ICombinedCrew[],
    },
    sortType: sortByProjectTime,
    filterContentType: sortByContentType,
    filterJobType: sortByJob,
  }).length;

  const sortingSwitcherChangeHandler = (
    job: string,
    projectTime: TProjectTime,
    contentType: TContentType
  ) => {
    setSortByJob(job);
    setSortByProjectTime(projectTime);
    setSortByContentType(contentType);
  };

  const personsJob = getPersonsJob(
    credits?.crew as ICombinedCrew[],
    credits?.cast as ICombinedCast[]
  );

  return {
    sortingSwitcherChangeHandler,
    projectCount,
    cardsListDataByActorFiltered,
    cardsListDataByOthersFiltered,
    sortByJob,
    personsJob,
  };
};
