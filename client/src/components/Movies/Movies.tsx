import "./style.scss";
import { MovieTopRate } from "../../types";

function Movies({ items }: { items: MovieTopRate[] }) {
  return (
    <div className="content">
      {items.map((item) => (
        <div key={item?.id}>
          <h1 key={item?.id} className="list-movie-text">
            {item.title}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default Movies;
