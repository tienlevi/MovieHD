import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";
import { getCountryFilter } from "../api/movie";
import { MovieList } from "../interface";

function Country() {
  const [countryFilter, setCountryFilter] = useState<MovieList[]>([]);
  const [pages, setPages] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName: any = searchParams.get("name");
  const paramTitle: any = searchParams.get("title");
  const paramPage: any = parseInt(searchParams.get("page") as string);

  const handleSelect = useCallback(
    (name: string, title: string) => {
      searchParams.set("name", name);
      searchParams.set("title", title);
      setSearchParams(searchParams);
      window.location.reload();
    },
    [paramName, paramPage]
  );

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountryFilter(
        paramName || "US",
        paramPage || 1
      );
      setCountryFilter(response.data.results);
      setPages(response.data.total_pages);
    };
    getData();
  }, []);

  return (
    <Title title={`${paramTitle ? paramTitle : "Country"} Movie`}>
      <Header />
      <Banner text={paramTitle} />
      <CountryFilter
        movies={countryFilter}
        title={paramTitle}
        handleSelect={handleSelect}
      />
      <Pagination
        currentPage={paramPage || 1}
        maxPageLimit={pages}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default Country;
