import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Section from "../Section/Section";
import { getGenres, ImageMovie } from "../../api/movie";
import { MovieList, MovieGenre } from "../../types";
import "./style.scss";
import "../Movies/style.scss";

interface SearchProps {
  movies: MovieList[];
  name: string;
}

function SearchFilter({ movies, name }: SearchProps) {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response.data.genres);
    };
    getData();
  }, []);

  return (
    <>
      <Section className="movie">
        <div className="search-movie">
          <h1>Search results for "{name}"</h1>
        </div>
        <div className="movie-content">
          {movies.map((movie: MovieList) => (
            <div className="movie-content-children" key={movie?.id}>
              <Link to="/" className="movie-content-img">
                <img src={ImageMovie(movie.poster_path)} alt="" />
                <div className="movie-content-play-icon">
                  <PlayArrowRoundedIcon
                    style={{ fontSize: 35, color: "white" }}
                  />
                </div>
                <div className="movie-content-language">
                  {movie.original_language}
                </div>
              </Link>
              <Link to="/" key={movie?.id} className="movie-content-title">
                <h2>{movie.title}</h2>
              </Link>
              <p className="movie-content-genre">
                {genres
                  .filter((genre) => movie.genre_ids.includes(genre.id))
                  .map((genre) => genre.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default SearchFilter;
