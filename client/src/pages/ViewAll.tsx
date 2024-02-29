import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function ViewAll() {
  const { type } = useParams();

  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);
  const [pages, setPages] = useState<[]>([]);
  const [tab, setTab] = useState<number>(1);
  useEffect(() => {
    const getData = async () => {
      const response: any = await getTopRateMovie(1);
      setMovies(response.data.results);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDataPage = async () => {
      const response: any = await getTopRateMovie(tab);
      setPages(response.data.total_pages);
      console.log(response.data);
    };
    getDataPage();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenre();
      setGenres(response.data.genres);
    };
    getData();
  }, []);
  return (
    <Title title="Top Rate Movie">
      <Header />
      <div className="view-all" style={{ marginTop: 95 }}>
        <Movies movies={movies} genres={genres} />
      </div>
      <Pagination pages={1} currentPage={1} />
    </Title>
  );
}

export default ViewAll;
