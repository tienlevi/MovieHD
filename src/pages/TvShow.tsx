import { useState, useEffect, useCallback } from "react";
import TV from "../components/TV/TV";
import Title from "../components/Title/Title";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Pagination from "../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { getTvShow } from "../api/tv";

function TvShow() {
  const [pages, setPages] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params: any = searchParams.get("page");
  const paramPage = Number(params);
  const handleClickPage = useCallback((page: number | string) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getTvShow(paramPage || 1);
      setPages(response?.total_pages);
    };
    getData();
  }, []);
  return (
    <Title title="TV Show">
      <Header />
      <div className="view-all" style={{ marginTop: 100 }}>
        <TV page={paramPage || 1} />
      </div>
      <Pagination
        currentPage={paramPage || 1}
        maxPageLimit={pages}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default TvShow;
