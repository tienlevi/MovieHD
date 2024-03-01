import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./style.scss";

interface Page {
  currentPage: number;
  clickPage: (page: number) => void;
}

function Pagination({ currentPage, clickPage }: Page) {
  const pages: any = [];
  for (let i = 1; i < 20; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination-prev">
        <ArrowBackIosNewIcon />
      </div>

      {pages?.map((number: any) => (
        <div
          className={`pagination-children ${
            currentPage === number && "pagination-children-active"
          }`}
          key={number}
          onClick={() => clickPage(number)}
        >
          {number}
        </div>
      ))}

      <div className="pagination-next">
        <NavigateNextIcon />
      </div>
    </div>
  );
}

export default Pagination;
