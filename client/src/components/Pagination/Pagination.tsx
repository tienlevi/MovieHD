import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./variabales.scss";

interface Page {
  currentPage: number;
  maxPageLimit: number;
  clickPage: (page: number) => void;
}

function Pagination({ currentPage, maxPageLimit, clickPage }: Page) {
  const nextPage = () => {
    clickPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      clickPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <div className="pagination-arrow" onClick={prevPage}>
        <KeyboardArrowLeftIcon />
      </div>
      {new Array(5).fill("").map((_, idx) => {
        const page = currentPage + idx - 2;
        return (
          page > 0 &&
          page <= maxPageLimit && (
            <div
              key={idx}
              onClick={() => clickPage(page)}
              className={`pagination-children ${
                currentPage === page && "pagination-children-active"
              }`}
            >
              {page}
            </div>
          )
        );
      })}

      <div className="pagination-arrow" onClick={nextPage}>
        <KeyboardArrowRightIcon />
      </div>
    </div>
  );
}

export default Pagination;
