function Pagination({ pages }: { pages: number }) {
  return (
    <div className="pagination">
      <div className="pagination-children">{pages}</div>
    </div>
  );
}

export default Pagination;
