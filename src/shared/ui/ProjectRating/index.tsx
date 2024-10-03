import { getZoneClass } from "@/shared/lib/getZoneClass";
import style from "./index.module.css";

interface IProjectRatingProps {
  vote_average: number;
}

export const ProjectRating = ({ vote_average }: IProjectRatingProps) => {
  const zoneClass = getZoneClass(vote_average);
  return (
    <div>
      <span className={style.detailTitle}>Rating: </span>
      <span className={`${style.rating} ${style[zoneClass]}`}>
        {vote_average.toFixed(1)}
      </span>
    </div>
  );
};
