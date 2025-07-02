import ReactPaginate from "react-paginate";
import { NextIcon, PreviousIcon } from "../../../utils/SvgIcons";

const GenericPagination = ({ pageCount, forcePage, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center">
      <ReactPaginate
        previousLabel={<PrevButton />}
        nextLabel={<NextButton />}
        breakLabel={"..."}
        pageCount={pageCount}
        forcePage={forcePage}
        onPageChange={onPageChange}
        containerClassName={"flex gap-2 items-center"}
        pageClassName={
          "px-3 py-1 font-semibold bg-[var(--card-bg)] rounded text-[var(--main-text)] cursor-pointer"
        }
        activeClassName={"bg-[var(--primary-color)] font-semibold text-black"}
        previousClassName={
          "px-3 py-1 font-semibold bg-[var(--card-bg)] rounded cursor-pointer text-[var(--main-text)]"
        }
        nextClassName={
          "px-3 py-1 font-semibold bg-[var(--card-bg)] rounded cursor-pointer text-[var(--main-text)]"
        }
        breakClassName={
          "px-3 py-1 font-semibold bg-[var(--card-bg)] rounded text-[var(--main-text)]"
        }
      />
    </div>
  );
};

export default GenericPagination;

export const NextButton = () => {
  return (
    <div className="px-1 py-1 font-semibold bg-[var(--card-bg)] rounded text-[var(--main-text)] flex items-center justify-center h-full">
      <NextIcon />
    </div>
  );
};

export const PrevButton = () => {
  return (
    <div className="px-1 py-1 font-semibold bg-[var(--card-bg)] rounded text-[var(--main-text)] flex items-center justify-center h-full">
      <PreviousIcon />
    </div>
  );
};
