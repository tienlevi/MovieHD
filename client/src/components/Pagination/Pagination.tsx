import ReactPaginate from "react-paginate";
import "./style.scss";

interface Page {
  currentPage: number;
  pages: number;
  clickPage: (currentPage: number) => void;
}

function Pagination({ currentPage, pages, clickPage }: Page) {
  return (
    <div className="pagination">
      <ReactPaginate
        className="page"
        nextLabel=">"
        onPageChange={() => clickPage(currentPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        pageCount={pages}
        previousLabel="<"
        activeLinkClassName="select"
      />
    </div>
  );
}

export default Pagination;
