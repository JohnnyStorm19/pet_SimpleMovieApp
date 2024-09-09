import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./PageHeader.module.css";
import { AppRoutes } from "@/shared/routes";

export const Header = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigator(-1);
  };

  if (location.pathname === "/") {
    return <></>;
  }

  return (
    <header className={style.pageHeader}>
      <span className={style.backLink} onClick={handleClick}>
        Back
      </span>
      <Link to={AppRoutes.MAIN} className={style.mainPageLink}>
        Main page
      </Link>
    </header>
  );
};
