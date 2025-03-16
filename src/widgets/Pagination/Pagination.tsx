import ReactPaginate from "react-paginate";
import style from "./Pagination.module.css";
import { useMatchMedia } from "@/shared/hooks";

interface IPaginationProps {
  totalPageCount: number;
  onPageChange: (e: { selected: React.SetStateAction<number> }) => void;
  forcePage: number;
}

export const Pagination = ({
  totalPageCount,
  onPageChange,
  forcePage,
}: IPaginationProps) => {
  const { isMobile } = useMatchMedia();

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        activeClassName={style.page__selected}
        containerClassName={style.container}
        pageClassName={style.page}
        previousClassName={style.previous}
        nextClassName={style.next}
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
