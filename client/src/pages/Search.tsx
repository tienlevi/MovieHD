import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchFilter from "../components/Filter/SearchFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName = searchParams.get("name");
  const paramPage = searchParams.get("page");
  const paramPageNumber = Number(paramPage);

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  return (
    <Title title="Search">
      <Header />
      <SearchFilter name={paramName as string} page={paramPageNumber || 1} />
      <Pagination
        currentPage={paramPageNumber || 1}
        maxPageLimit={50}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default Search;
