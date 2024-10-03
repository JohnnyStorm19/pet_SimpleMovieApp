import { REQUEST_URLS } from "@/shared/api/requestApi";
import { useNavigate } from "react-router-dom";
import { ICreditsCast } from "../../model/types.interface";
import style from "./index.module.css";

interface ITVCastItemProps {
  person: ICreditsCast;
}

export const TVCastItem = ({ person }: ITVCastItemProps) => {
  const navigate = useNavigate();

  const handleMouseClick = () => {
    navigate(`/person/${person.id}`);
  };

  return (
    <div className={style.profile} onClick={handleMouseClick}>
      <div className={style.img__container}>
        {person.profile_path && (
          <img
            src={`${REQUEST_URLS.images.FACE_IMG}${person.profile_path}`}
            alt={person.name}
            loading="lazy"
          />
        )}
      </div>
      <div className={style.profile_info}>
        <span>{person.name}</span>
        <span>role: {person.character}</span>
      </div>
    </div>
  );
};
