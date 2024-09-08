import { useState } from "react";
import style from "./SearchSwitcher.module.css";
import clsx from "clsx";
import { TSearchSwitcher } from "@/shared/models/TSearchSwitcher.type";
import { useSearchParams } from "react-router-dom";

export const SearchSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearchType, setCurrentSearchType] = useState(
    searchParams.get("searchType") || "keyword"
  );

  const handleSwitcherClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const searchType = e.currentTarget.getAttribute(
      "data-search-type"
    ) as TSearchSwitcher;
    handleSearchSwitcher(searchType);
  };

  const handleSearchSwitcher = (type: TSearchSwitcher) => {
    setCurrentSearchType(type);
    setSearchParams({ genres: "", searchType: type });
  };

  return (
    <div className={style.switcher_container}>
      <button
        data-search-type="keyword"
        onClick={handleSwitcherClick}
        className={clsx(
          style.switcher__btn,
          currentSearchType === "keyword" && style.clicked
          // clickedBtn === "keyword" && style.clicked
        )}
      >
        Search by name
      </button>
      <button
        data-search-type="genre"
        onClick={handleSwitcherClick}
        className={clsx(
          style.switcher__btn,
          currentSearchType === "genre" && style.clicked
          // clickedBtn === "genre" && style.clicked
        )}
      >
        Search by genre
      </button>
    </div>
  );
};
