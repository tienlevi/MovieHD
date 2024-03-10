import { ImageMovie } from "../../api/movie";
import { MovieId } from "../../types";
import Section from "../Section/Section";
import "./style.scss";

function MovieDetail({ movie }: { movie: MovieId }) {
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
              {/* Country: <span>{movie?.production_countries[0]?.name}</span> */}
            </p>
            <p>
              Duration: <span></span>
            </p>
            <p>
              Quanlity: <button>HD</button>
            </p>
            <p>
              Release: <span>2023</span>
            </p>
            <p>
              IMDB: <button></button>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default MovieDetail;
