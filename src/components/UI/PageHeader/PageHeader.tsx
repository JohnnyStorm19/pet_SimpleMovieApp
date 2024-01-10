import BackLink from "../BackLink/BackLink";
import MainPageLink from "../MainPageLink/MainPageLink";
import style from './PageHeader.module.css'

const PageHeader = () => {
  return (
    <header className={style.pageHeader}>
      <BackLink />
      <MainPageLink />
    </header>
  );
};

export default PageHeader;
