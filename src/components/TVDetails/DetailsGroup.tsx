import { ITvCard_Single } from "../../types/models";
import CreatedBy from "../CreatedBy/CreatedBy";
import style from "./DetailsGroup.module.css";

interface IDetailsGroupProps {
  detailsArray: ITvCard_Single;
}

//todo удалить

const DetailsGroup = ({ detailsArray }: IDetailsGroupProps) => {
  return (
    <div className={style.details__container}>
      {detailsArray.created_by.length > 0 && (
        <CreatedBy detailsArray={detailsArray}/>
      )}
      {detailsArray.episode_run_time.length > 0 && (
        <div className={style.detail__container}>
          <span className={style.detail}>Episode run time: </span>
          {detailsArray.episode_run_time.map((time) => time + ", ")}
        </div>
      )}
      <div className={style.detail__container}>
        <span className={style.detail}>Episodes overall: </span>
        {detailsArray.number_of_episodes}
      </div>
      <div className={style.detail__container}>
        <span className={style.detail}>Seasons overall: </span>
        {detailsArray.number_of_seasons}
      </div>
      <div className={style.detail__container}>
        <span className={style.detail}>Status: </span>
        {detailsArray.status}
      </div>
    </div>
  );
};

export default DetailsGroup;
