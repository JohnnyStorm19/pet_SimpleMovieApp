import ReactPaginate from "react-paginate";
import style from './Pagination.module.css';

interface IPaginationProps {
  totalPageCount: number;
  onPageChange: (e: { selected: React.SetStateAction<number> }) => void;
  forcePage: number;
}

const Pagination = ({ totalPageCount, onPageChange, forcePage }: IPaginationProps) => {
    return (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            activeClassName={style.page__selected}
            containerClassName={style.container}
            pageClassName={style.page}
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={totalPageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            forcePage={forcePage}
          />
        </>
      );
};

export default Pagination;
