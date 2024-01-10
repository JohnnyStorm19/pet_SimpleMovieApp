import { Link } from "react-router-dom"
import style from './MainPageLink.module.css'

const MainPageLink = () => {
  return (
    <Link to={"/"} className={style.mainPageLink}>Main page</Link>
  )
}

export default MainPageLink
