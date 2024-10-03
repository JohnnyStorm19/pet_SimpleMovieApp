import { useNavigate } from "react-router-dom";
import style from "./TVCastItem.module.css";
import { ICreditsSerialsCast, IRole } from "../../types/models";
import { useCallback } from "react";
import { REQUEST_URLS } from "@/shared/api/requestApi";

interface ICastItem_FullProps {
  person: ICreditsSerialsCast;
}

// const getAllRoles = (rolesArray: IRole[]) => {
//   return rolesArray.map((role) => role.character).join("/");
// };

export const CastItem_Full = ({ person }: ICastItem_FullProps) => {
  const navigate = useNavigate();
  const getAllRoles = useCallback((rolesArray: IRole[]) => {
    return rolesArray.map((role) => role.character).join("/");
  }, []);
  const allRoles = getAllRoles(person.roles);

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
        <span className={style.role}>role: {allRoles}</span>
      </div>
    </div>
  );
};
