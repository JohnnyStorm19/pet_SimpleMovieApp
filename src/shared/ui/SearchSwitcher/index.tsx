import { useState } from "react";
import style from "./SearchSwitcher.module.css";
import clsx from "clsx";
import { TSearchSwitcher } from "@/shared/models/TSearchSwitcher.type";

// todo можно сделать фильтр поиска через url

interface ISearchSwitcherProps {
  handleSearchSwitcher: (type: TSearchSwitcher) => void;
}

export const SearchSwitcher = ({
  handleSearchSwitcher,
}: ISearchSwitcherProps) => {
  const [clickedBtn, setClickedBtn] = useState("keyword");

  const onBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute(
      "data-search-type"
    ) as TSearchSwitcher;
    setClickedBtn(searchType);
    handleSearchSwitcher(searchType);
  };

  return (
    <div className={style.switcher_container}>
      <button
        data-search-type="keyword"
        onClick={onBtnClick}
        className={clsx(
          style.switcher__btn,
          clickedBtn === "keyword" && style.clicked
        )}
      >
        Search by name
      </button>
      <button
        data-search-type="genre"
        onClick={onBtnClick}
        className={clsx(
          style.switcher__btn,
          clickedBtn === "genre" && style.clicked
        )}
      >
        Search by genre
      </button>
    </div>
  );
};
