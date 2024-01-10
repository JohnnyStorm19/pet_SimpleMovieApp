import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.overlay}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
