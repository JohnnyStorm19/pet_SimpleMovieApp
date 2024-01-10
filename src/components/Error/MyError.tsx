import style from './MyError.module.css'


const MyError = () => {
  return (
    <div className={style.overlay}>
      <p>Something went wrong 😭</p>
    </div>
  );
};

export default MyError;
