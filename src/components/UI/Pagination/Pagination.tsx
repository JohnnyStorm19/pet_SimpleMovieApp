import ReactPaginate from "react-paginate";
import style from "./Pagination.module.css";
import { useEffect, useState } from "react";

interface IPaginationProps {
  totalPageCount: number;
  onPageChange: (e: { selected: React.SetStateAction<number> }) => void;
  forcePage: number;
}

const Pagination = ({
  totalPageCount,
  onPageChange,
  forcePage,
}: IPaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    const initialWidth = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    initialWidth();
  }, [])

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        activeClassName={style.page__selected}
        containerClassName={style.container}
        pageClassName={style.page}
        onPageChange={onPageChange}
        pageRangeDisplayed={isMobile ? 1 : 5}
        marginPagesDisplayed={isMobile ? 2 : 3}
        pageCount={totalPageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        forcePage={forcePage}
      />
    </>
  );
};

export default Pagination;
