import { useParams, useLocation } from "react-router-dom";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function ViewAll() {
  const { type }: any = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams();
  const getParams = new URLSearchParams(location.search).get("page");
  const params = Number(getParams);

  const handleClickPage = (page: number) => {
    searchParams.set("page", page.toString());
    const url = `${location.pathname}?${searchParams}`;
    window.history.pushState(null, "", url);
    window.location.reload();
  };
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
      <Pagination currentPage={params || 1} clickPage={handleClickPage} />
    </Title>
  );
}

export default ViewAll;
