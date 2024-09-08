import style from './MyError.module.css'


export const MyError = () => {
  return (
    <div className={style.overlay}>
      <p>Something went wrong 😭</p>
    </div>
  );
};
