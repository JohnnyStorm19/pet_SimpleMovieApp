import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { ITvCard_Single } from "@/types/models";

interface ICreatedByProps {
  createdByArr: ITvCard_Single["created_by"];
}

export const CreatedBy = ({ createdByArr }: ICreatedByProps) => {
  const navigate = useNavigate();

  const onPersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className={style.createdBy_container}>
      <span className={style.detail}>Created by: </span>
      {createdByArr.map((person, i, array) => {
        if (i === array.length - 1) {
          return <span key={person.credit_id} onClick={() => onPersonClick(person.id)} className={style.name}>{person.name}</span>;
        }
        return <span key={person.credit_id} onClick={() => onPersonClick(person.id)} className={style.name}>{person.name + ", "}</span>;
      })}
    </div>
  );
};
