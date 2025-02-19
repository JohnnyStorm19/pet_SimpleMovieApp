import { useNavigate } from "react-router-dom";
import style from "./DirectedBy.module.css";
import { ICreditsCrew } from "@/entities/cast/model/types.interface";

interface DirectedByProps {
  crew: ICreditsCrew[];
}

const DirectedBy = ({ crew }: DirectedByProps) => {
  const navigate = useNavigate();

  const directors = crew.filter((person) => person.job === "Director");
  const onPersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className={style.directedBy__container}>
      <h2>directed by</h2>
      {directors.map((director, index, array) => {
        if (index === array.length - 1) {
          return (
            <h2
              key={director.id}
              className={style.person__name}
              onClick={() => onPersonClick(director.id)}
            >
              {director.name}
            </h2>
          );
        }
        return (
          <h2
            key={director.id}
            className={style.person__name}
            onClick={() => onPersonClick(director.id)}
          >
            {director.name},{" "}
          </h2>
        );
      })}
    </div>
  );
};

export default DirectedBy;
