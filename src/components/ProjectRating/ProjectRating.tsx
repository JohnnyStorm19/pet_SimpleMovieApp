import { getZoneClass } from '../../services/utils/getZoneClass';
import style from './ProjectRating.module.css'

interface IProjectRatingProps {
    vote_average: number;
}

const ProjectRating = ({vote_average}: IProjectRatingProps) => {
  return (
    <div>
      <span className={style.detailTitle}>Rating: </span>
      <span
        className={`${style.rating} ${
          style[getZoneClass(vote_average)]
        }`}
      >
        {vote_average.toFixed(1)}
      </span>
    </div>
  );
};

export default ProjectRating;
