import { useState } from "react";
import style from './SearchSwitcher.module.css'

interface ISearchSwitcherProps {
    handleSearchSwitcher: (type: string) => void;
}

const SearchSwitcher = ({handleSearchSwitcher}: ISearchSwitcherProps) => {
  const [clickedBtn, setClickedBtn] = useState("keyword");

  const onBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute("data-search-type");
    setClickedBtn(searchType as string);
    handleSearchSwitcher(searchType as string);
  };

  return (
    <div className={style.switcher_container}>
        <button data-search-type="keyword" onClick={onBtnClick} className={`${style.switcher__btn} ${clickedBtn === 'keyword' ? style.clicked : ''}`}>
          Search by name
        </button>
        <button data-search-type="genre" onClick={onBtnClick} className={`${style.switcher__btn} ${clickedBtn === 'genre' ? style.clicked : ''}`}>
          Search by genre
        </button>
    </div>
  );
};

export default SearchSwitcher;
