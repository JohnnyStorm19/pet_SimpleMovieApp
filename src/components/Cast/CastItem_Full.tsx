import { useNavigate } from "react-router-dom";
import { REQUEST_URLS } from "../../services/api/requestApi";
import style from "./TVCastItem.module.css";
import { ICreditsSerialsCast, IRole } from "../../types/models";


interface ICastItem_FullProps {
  person: ICreditsSerialsCast;
}

const getAllRoles = (rolesArray: IRole[]) => {
  return rolesArray.map((role) => role.character).join("/");
};

const CastItem_Full = ({ person }: ICastItem_FullProps) => {
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
        <span>role: {getAllRoles(person.roles)}</span>
      </div>
    </div>
  );
};

export default CastItem_Full;
