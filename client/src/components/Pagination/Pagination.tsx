import "./style.scss";
// import

interface Page {
  pages: number;
  currentPage: number;
}

function Pagination({ pages, currentPage }: Page) {
  return (
    <div className="pagination">
      <div className="pagination-children">
        {pages},{currentPage}
      </div>
    </div>
  );
}

export default Pagination;
