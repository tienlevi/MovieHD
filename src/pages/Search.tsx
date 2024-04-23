import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchFilter from "../components/Filter/SearchFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";
import { searchQuery } from "../api/search";
import { MovieQuery } from "../interface/query";

function Search() {
  const [searchFilter, setSearchFilter] = useState<MovieQuery[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<any>();
  const paramName: any = searchParams.get("q");
  const paramPage = searchParams.get("page");
  const paramPageNumber = Number(paramPage);

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await searchQuery(paramName, paramPageNumber || 1);
      setSearchFilter(response.results);
      setPages(response.total_pages);
    };
    getData();
  }, []);

  return (
    <Title title={`Search results for "${paramName}" || MoPlay`}>
      <Header />
      <SearchFilter movies={searchFilter} name={paramName} />
      <Pagination
        currentPage={paramPageNumber || 1}
        maxPageLimit={pages}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default Search;
