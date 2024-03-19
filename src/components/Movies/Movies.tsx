import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies, getGenres, ImageMovie } from "../../api/movie";
import { MovieList, MovieGenre } from "../../types";
import Section from "../Section/Section";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./style.scss";

interface MoviesProps {
  type: string;
  typeHref: string;
  typeApi: string;
  page: number;
}

function Movies({ type, typeHref, typeApi, page }: MoviesProps) {
  const [movies, setMovies] = useState<MovieList[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getMovies(typeApi, page);
      setMovies(response.data.results);
    };
    getData();
  }, []);

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
        <div className="movie-title-view">
          <h1 className="movie-title">{type}</h1>
          <Link to={`/view-all/${typeHref}`} className="movie-view-more">
            <p>View All</p>
            <KeyboardDoubleArrowRightIcon
              style={{ marginLeft: 5, marginBottom: 3 }}
            />
          </Link>
        </div>
        <div className="movie-content">
          {movies.map((movie) => (
            <div className="movie-content-children" key={movie?.id}>
              <Link to={`/detail/${movie?.id}`} className="movie-content-img">
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
              <Link
                to={`/detail/${movie?.id}`}
                key={movie?.id}
                className="movie-content-title"
              >
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

export default Movies;
