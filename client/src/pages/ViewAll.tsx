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
  const searchParams = new URLSearchParams();
  const getParams = new URLSearchParams(location.search).get("page");
  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    console.log(getParams);
    const getData = async () => {
      const response: any = await getTopRateMovie(Number(getParams));
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
    console.log(url);
  };
  return (
    <Title title="Top Rate Movie">
      <Header />
      <div className="view-all" style={{ marginTop: 95 }}>
        <Movies movies={movies} genres={genres} />
      </div>
      <Pagination currentPage={page} pages={20} clickPage={handleClickPage} />
    </Title>
  );
}

export default ViewAll;
