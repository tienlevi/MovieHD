import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Section from "../Section/Section";
import {
  getCountryFilter,
  getCountry,
  getGenres,
  ImageMovie,
} from "../../api/movie";
import { MovieGenre, MovieCountry, MovieList } from "../../types";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.scss";

function CountryFilter({ name }: { name: string }) {
  const [countryFilter, setCountryFilter] = useState<MovieList[]>([]);
  const [countries, setCountries] = useState<MovieCountry[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountryFilter("IT");
      setCountryFilter(response.data.results);
      console.log(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response.data.genres);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountry();
      setCountries(response.data);
    };
    getData();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Section className="movie">
        <div className="select-type-movie">
          <div className="movie-selected" onClick={handleToggle}>
            Select Type
            <div
              className={`movie-selected-icon${toggle ? " movie-selected-icon-active" : ""}`}
            >
              <KeyboardArrowDownRoundedIcon />
            </div>
          </div>

          <div
            className={`movie-select${toggle ? " movie-select-active" : ""}`}
          >
            {countries.map((country: MovieCountry) => (
              <p>{country.english_name}</p>
            ))}
          </div>
        </div>
        <div className="movie-content">
          {countryFilter.map((movie: MovieList) => (
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
                {genres
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

export default CountryFilter;
