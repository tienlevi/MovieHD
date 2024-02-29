import { useState } from "react";
import { MovieList } from "../../types";

function Pagination({ movies }: { movies: MovieList[] }) {
  return <div className="pagination">{movies.map(item)}</div>;
}

export default Pagination;
