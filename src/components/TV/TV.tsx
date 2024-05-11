import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../Section/Section";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./style.scss";
import { getTvShow, ImageTv } from "../../api/tv";
import { MovieGenre } from "../../interface/movie";
import { getGenres } from "../../api/movie";
import { TvShowList } from "../../interface/tv";
interface TvProps {
  page: string | number;
}

function TV({ page }: TvProps) {
  const [lists, setLists] = useState<TvShowList[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getTvShow(page);
      setLists(response.results);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response.genres);
    };
    getData();
  }, []);

  return (
    <Section className="movie">
      <div className="movie-title-view">
        <h1 className="movie-title">Tv Show</h1>
        <Link to={`/tv-show`} className="movie-view-more">
          <p>View All</p>
          <KeyboardDoubleArrowRightIcon
            style={{ marginLeft: 5, marginBottom: 3 }}
          />
        </Link>
      </div>
      <div className="movie-content">
        {lists?.map((list: TvShowList) => (
          <div className="movie-content-children" key={list?.id}>
            <Link
              to={`/detail-tv-show/${list?.id}`}
              className="movie-content-img"
            >
              <img src={ImageTv(list.poster_path)} alt="" />
              <div className="movie-content-play-icon">
                <PlayArrowRoundedIcon
                  style={{ fontSize: 35, color: "white" }}
                />
              </div>
              <div className="movie-content-language">
                {list.original_language}
              </div>
            </Link>
            <Link
              to={`/detail/${list?.id}`}
              key={list?.id}
              className="movie-content-title"
            >
              <h2>{list.name}</h2>
            </Link>
            <p className="movie-content-genre">
              {genres
                .filter((genre) => list.genre_ids.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TV;
