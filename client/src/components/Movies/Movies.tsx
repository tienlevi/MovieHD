import "./style.scss";
import { MovieTopRate } from "../../types";
import Section from "../Section/Section";
import { ImageMovie } from "../../api/movie";

function Movies({ items }: { items: MovieTopRate[] }) {
  return (
    <>
      <Section className="top-rate">
        <h1 className="">Top rate</h1>
        <div className="top-rate-movie">
          {items.map((item) => (
            <div className="top-rate-movie-children" key={item?.id}>
              <img width={300} src={ImageMovie(item.poster_path)} alt="" />
              <h2 key={item?.id} className="list-movie-text">
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
