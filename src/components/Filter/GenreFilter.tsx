import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres, ImageMovie } from "../../api/movie";
import { MovieList, MovieGenre } from "../../interface/movie";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Section from "../Section/Section";
import "./style.scss";
import "../Movies/style.scss";
import Loading from "../Loading/Loading";

interface GenreFilterProps {
  movies: MovieList[];
}

function GenreFilter({ movies }: GenreFilterProps) {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response?.genres);
    };
    getData();
  }, []);
  return (
    <>
      <Section className="movie">
        <div className="movie-content">
          {movies.length === 0 ? (
            <Loading />
          ) : (
            movies.map((movie: any) => (
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
                    .filter((genre: any) => movie.genre_ids.includes(genre.id))
                    .map((genre: any) => genre.name)
                    .join(", ")}
                </p>
              </div>
            ))
          )}
        </div>
      </Section>
    </>
  );
}

export default GenreFilter;
