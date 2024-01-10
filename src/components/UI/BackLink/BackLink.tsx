import { Link, useNavigate } from "react-router-dom";
import style from "./BackLink.module.css";

const BackLink = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator(-1);
  };

  return (
    <Link to={"/"} className={style.backLink} onClick={handleClick}>
      Back
    </Link>
  );
};

export default BackLink;
