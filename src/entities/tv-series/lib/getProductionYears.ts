import { ITvCard_Single } from "@/types/models";

export const getProductionYears = (result: ITvCard_Single) => {
  const start = result.first_air_date.slice(0, 4);
  if (result.in_production) {
    return `${start}-...`;
  }
  const end = result.last_air_date.slice(0, 4);
  if (end === start) {
    return start;
  }
  return `${start}-${end}`;
};
