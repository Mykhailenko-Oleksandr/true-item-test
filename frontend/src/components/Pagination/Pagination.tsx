import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";
import type { Dispatch, ComponentType } from "react";
import type { ReactPaginateProps } from "react-paginate";

interface PaginationProps {
  totalPages: number;
  page: number;
  updatePage: Dispatch<React.SetStateAction<number>>;
}

const ReactPaginate =
  (
    ReactPaginateModule as unknown as {
      default: ComponentType<ReactPaginateProps>;
    }
  ).default ||
  (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);

export default function Pagination({
  totalPages,
  page,
  updatePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        updatePage(selected + 1)
      }
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
