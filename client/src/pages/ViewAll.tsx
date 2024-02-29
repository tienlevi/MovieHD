import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGenre, getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Section from "../components/Section/Section";

function ViewAll() {
  const { type } = useParams();
  console.log(type);

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
      <Section className="view-all-title">
        <h1>{type}</h1>
      </Section>
      <Movies items={movies} genres={genres} />
    </Title>
  );
}

export default ViewAll;
