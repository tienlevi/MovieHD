import { useState, useEffect } from "react";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";

function ViewAll() {
  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response: any = await getTopRateMovie(1);
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
  return (
    <Title title="Top Rate Movie">
      <Header />
      <Movies items={movies} genres={genres} />
    </Title>
  );
}

export default ViewAll;
