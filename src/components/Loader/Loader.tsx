import style from "./Loader.module.css";

//todo удалить!

const Loader = () => {
  return (
    <div className={style.overlay}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
