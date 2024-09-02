import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./PageHeader.module.css";

export const Header = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigator(-1);
  };

  if (location.pathname === "/") {
    return <></>;
  }

  // todo если это главная - скрывать header
  return (
    <header className={style.pageHeader}>
      <Link to={"/"} className={style.backLink} onClick={handleClick}>
        Back
      </Link>
      <Link to={"/"} className={style.mainPageLink}>
        Main page
      </Link>
    </header>
  );
};
