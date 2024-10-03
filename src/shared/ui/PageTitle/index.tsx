import style from "./style.module.css";

export const PageTitle = ({ textContent }: { textContent: string }) => {
  return <h2 className={style.title}>{textContent}</h2>;
};
