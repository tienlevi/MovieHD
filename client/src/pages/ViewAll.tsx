import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function ViewAll() {
  const { type } = useParams();
  const location = useLocation();
  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);
  const searchParams = new URLSearchParams();
  const getParams = new URLSearchParams(location.search).get("page");
  const params = Number(getParams);

  useEffect(() => {}, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getTopRateMovie(params || 1);
      setMovies(response.data.results);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenre();
      setGenres(response.data.genres);
    };
    getData();
  }, []);

  const handleClickPage = (page: number) => {
    searchParams.set("page", page.toString());
    const url = `${location.pathname}?${searchParams}`;
    window.history.pushState(null, "", url);
    window.location.reload();
  };
  return (
    <Title title="Top Rate Movie">
      <Header />
      <div className="view-all" style={{ marginTop: 95 }}>
        <Movies movies={movies} genres={genres} />
      </div>
      <Pagination currentPage={params || 1} clickPage={handleClickPage} />
    </Title>
  );
}

export default ViewAll;
