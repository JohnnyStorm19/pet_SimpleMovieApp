import { ICreditsCrew } from "@/types/models";

export const getUniqueJobs = (arr: ICreditsCrew[]): string[] => {
  const jobs = arr.map((person) => person.job);

  return Array.from(new Set(jobs));
};
