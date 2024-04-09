import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../Section/Section";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./style.scss";
import { getTvShow, ImageTv } from "../../api/tv";
interface TvProps {
  page: string | number;
}

function TV({ page }: TvProps) {
  const [listTv, setListTv] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response: any = await getTvShow(page);
      setListTv(response.data.results);
    };
    getData();
  }, []);

  return (
    <Section className="movie">
      <div className="movie-title-view">
        <h1 className="movie-title">Tv Show</h1>
        <Link to={`/view-all/}`} className="movie-view-more">
          <p>View All</p>
          <KeyboardDoubleArrowRightIcon
            style={{ marginLeft: 5, marginBottom: 3 }}
          />
        </Link>
      </div>
      <div className="movie-content">
        {listTv.map((movie: any) => (
          <div className="movie-content-children" key={movie?.id}>
            <Link to={`/detail/${movie?.id}`} className="movie-content-img">
              <img src={ImageTv(movie.poster_path)} alt="" />
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
            {/* <p className="movie-content-genre">
              {genres
                .filter((genre) => movie.genre_ids.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")}
            </p> */}
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TV;
