import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { ICreditsCast } from "../../model/types.interface";

interface ICastItemProps {
  person: ICreditsCast;
}

export const MovieCastItem = ({ person }: ICastItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseClick = () => {
    navigate(`/person/${person.id}`);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      className={style.detail_person}
    >
      <span>{person.name}</span>
      <span
        className={`${style.detail_character} ${isHovered ? style.active : ""}`}
      >
        {person.character}
      </span>
    </div>
  );
};
