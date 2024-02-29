import { Link } from "react-router-dom";
import { MovieList, MovieGenre } from "../../types";
import Section from "../Section/Section";
import { ImageMovie } from "../../api/movie";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./style.scss";

function Movies({
  movies,
  genres,
}: {
  movies: MovieList[];
  genres: MovieGenre[];
}) {
  return (
    <>
      <Section className="movie">
        <div className="movie-title-view">
          <h1 className="movie-title">Top rate</h1>
          <Link to={`/view-all/top-rate`} className="movie-view-more">
            <p>View All</p>
            <KeyboardDoubleArrowRightIcon
              style={{ marginLeft: 5, marginBottom: 3 }}
            />
          </Link>
        </div>
        <div className="movie-content">
          {movies.map((movie) => (
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
                {genres &&
                  genres
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
