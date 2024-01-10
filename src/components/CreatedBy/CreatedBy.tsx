import { useNavigate } from "react-router-dom";
import { ITvCard_Single } from "../../types/models";
import style from "./CreatedBy.module.css";

interface ICreatedByProps {
  detailsArray: ITvCard_Single;
}

const CreatedBy = ({ detailsArray }: ICreatedByProps) => {
  const navigate = useNavigate();

  const onPersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className={style.createdBy_container}>
      <span className={style.detail}>Created by: </span>
      {detailsArray.created_by.map((person, i, array) => {
        if (i === array.length - 1) {
          return <span key={person.credit_id} onClick={() => onPersonClick(person.id)} className={style.name}>{person.name}</span>;
        }
        return <span key={person.credit_id} onClick={() => onPersonClick(person.id)} className={style.name}>{person.name + ", "}</span>;
      })}
    </div>
  );
};

export default CreatedBy;
