import { useEffect } from "react";
import { ImageMovie } from "../../api/movie";
import { MovieId } from "../../interface/movie";
import Section from "../Section/Section";
import "./style.scss";

interface Props {
  movie: MovieId;
  onAdd: (data: any) => void;
}

function MovieDetail({ movie, onAdd }: Props) {
  useEffect(() => {
    document.title = `Watch ${movie?.original_title}`;
  }, [document.title]);
  return (
    <Section className="container-detail">
      <div className="movie-detail">
        <div className="movie-detail-img">
          <img src={ImageMovie(movie?.poster_path)} alt="" />
        </div>
        <div className="movie-detail-text">
          <div className="movie-detail-title">
            <h1>{movie?.title}</h1>
          </div>
          <div className="movie-detail-description">
            <p>{movie?.overview}</p>
          </div>
          <div className="movie-detail-info">
            <p>
              Genre:{" "}
              <span>
                {movie?.genres
                  .map((item) => {
                    return item.name;
                  })
                  .join(", ")}
              </span>
            </p>
            <p>
              Country: {""}
              <span>
                {movie?.production_countries
                  .map((country: any) => {
                    return country.name;
                  })
                  .join(", ")}
              </span>
            </p>
            <p>
              Release: <span>{movie?.release_date}</span>
            </p>
          </div>
          <div className="movie-detail-btn" onClick={() => onAdd(movie)}>
            Add to favorites
          </div>
        </div>
      </div>
    </Section>
  );
}

export default MovieDetail;
