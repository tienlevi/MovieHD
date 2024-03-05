import { useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function ViewAll() {
  const { type }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get("page");
  const params = Number(getParams);

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);
  const checkTypeApi = type === "popular" ? "top_rated" : "now_playing";
  const checkTypeName = type === "popular" ? "Popular" : "New";

  return (
    <Title title={`${type[0]?.toUpperCase() + type?.substring(1)} Movies`}>
      <Header />
      <div className="view-all" style={{ marginTop: 95 }}>
        <Movies
          type={`${checkTypeName} Movies`}
          typeHref=""
          typeApi={checkTypeApi}
          page={params || 1}
        />
      </div>
      <Pagination
        currentPage={params || 1}
        maxPageLimit={100}
        clickPage={handleClickPage}
      />
    </Title>
  );
}

export default ViewAll;
