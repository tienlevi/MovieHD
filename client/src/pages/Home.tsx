import { useState, useEffect } from "react";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Title from "../components/Title/Title";

function Home() {
  const [movies, setMovies] = useState<[]>([]);
  const [genres, setGenres] = useState<[]>([]);

  return (
    <Title title="MoPlay - Watch Free Movies Online">
      <Header />
      <SlideShow />
      <Movies
        type="Top rate"
        typeHref="top-rate"
        typeApi="top_rated"
        movies={movies}
        genres={genres}
        page={1}
        setMovies={setMovies}
        setGenres={setGenres}
      />
      {/* <Movies
        typeHref="trending"
        type="Trending"
        movies={movies}
        genres={genres}
      />
      <Movies
        typeHref="trending"
        type="Trending"
        movies={movies}
        genres={genres}
      />
      <Movies
        typeHref="trending"
        type="Trending"
        movies={movies}
        genres={genres}
      /> */}
    </Title>
  );
}

export default Home;
