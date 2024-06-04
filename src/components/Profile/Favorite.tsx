import { Link } from "react-router-dom";
import { ImageMovie } from "../../api/movie";
import "./style.scss";

interface Props {
  lists: [];
  handleRemove: (id: any) => void;
}

function Favorite({ lists, handleRemove }: Props) {
  return (
    <div className="favorite-movie-list">
      {lists.map((item: any, index: number) => (
        <div
          key={index}
          className="favorite-movie-children"
          onClick={() => handleRemove(item.id)}
        >
          <Link
            to={`${item.type === "movie" ? `/detail/${item?.detailId}` : `/detail-tv-show/${item.detailId}`}`}
            className="favorite-movie-img"
          >
            <img src={ImageMovie(item?.poster_path)} alt="" />
          </Link>
          <Link
            to={`/detail/${item?.id}`}
            key={item?.id}
            className="favorite-movie-title"
          >
            <h2>{item.title}</h2>
          </Link>
          <div className="favorite-movie-children-btn">Remove</div>
        </div>
      ))}
    </div>
  );
}

export default Favorite;
