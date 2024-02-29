import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Section from "../components/Section/Section";
import Pagination from "../components/Pagination/Pagination";

function ViewAll() {
  const { type } = useParams();

  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const getData = async () => {
      const response: any = await getTopRateMovie(1);
      setMovies(response.data.results);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDataPage = async () => {
      const response: any = await getTopRateMovie(page);
      setPage(page);
      console.log(response);
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
      <Section className="view-all-title">
        <h1>{type}</h1>
      </Section>
      <Movies movies={movies} genres={genres} />
    </Title>
  );
}

export default ViewAll;
