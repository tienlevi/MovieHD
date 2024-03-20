import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchFilter from "../components/Filter/SearchFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";
import { searchMovie } from "../api/movie";
import { MovieList } from "../interface";

function Search() {
  const [searchFilter, setSearchFilter] = useState<MovieList[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<any>();
  const paramName: any = searchParams.get("name");
  const paramPage = searchParams.get("page");
  const paramPageNumber = Number(paramPage);

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await searchMovie(paramName, paramPageNumber || 1);
      setSearchFilter(response.data.results);
      setPages(response.data.total_pages);
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
