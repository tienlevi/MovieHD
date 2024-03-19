import { useState, useEffect, useCallback, CSSProperties } from "react";
import { useSearchParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";
import { getCountryFilter } from "../api/movie";
import { MovieList } from "../types";

function Country() {
  const [loading, setLoading] = useState<boolean>(true);
  const [countryFilter, setCountryFilter] = useState<MovieList[]>([]);
  const [pages, setPages] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get("page");
  const params = Number(getParams);
  const paramName: any = searchParams.get("name");
  const paramId: any = searchParams.get("id");

  const handleSelect = useCallback(
    (id: string, name: string) => {
      searchParams.set("name", name);
      searchParams.set("id", id);
      setSearchParams(searchParams);
      window.location.reload();
    },
    [paramName]
  );

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  const override: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountryFilter(paramId || "US", params);
      setCountryFilter(response.data.results);
      setPages(response.data.total_pages);
      console.log(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Title title={`${paramName ? paramName : "Country"} Movie`}>
      {loading ? (
        <BounceLoader
          color={"#29b6f6"}
          loading={loading}
          cssOverride={override}
          size={50}
        />
      ) : (
        <>
          <Header />
          <Banner text={paramName} />
          <CountryFilter
            movies={countryFilter}
            name={paramName}
            handleSelect={handleSelect}
          />
          <Pagination
            currentPage={params || 1}
            maxPageLimit={pages}
            clickPage={handleClickPage}
          />
          <Footer />
        </>
      )}
    </Title>
  );
}

export default Country;
