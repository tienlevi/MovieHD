import "./style.scss";
import { MovieList } from "../../types";
import Section from "../Section/Section";
import { ImageMovie } from "../../api/movie";

function Movies({ items }: { items: MovieList[] }) {
  return (
    <>
      <Section className="movie">
        <h1 className="movie-title">Top rate</h1>
        <div className="movie-detail">
          {items.map((item) => (
            <div className="movie-detail-children" key={item?.id}>
              <img src={ImageMovie(item.poster_path)} alt="" />
              <h2 key={item?.id} className="movie-detail-title">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default Movies;
