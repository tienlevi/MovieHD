import { useState, useEffect } from "react";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Title from "../components/Title/Title";

function Home() {
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
    <Title title="MoPlay - Watch Free Movies Online">
      <Header />
      <SlideShow />
      <Movies movies={movies} genres={genres} />
    </Title>
  );
}

export default Home;
