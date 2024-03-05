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

interface CountryFilterProps {
  name: string;
  handleSelect: (name: string) => void;
}

function CountryFilter({ name, handleSelect }: CountryFilterProps) {
  const [countryFilter, setCountryFilter] = useState<MovieList[]>([]);
  const [countries, setCountries] = useState<MovieCountry[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountryFilter("IT");
      setCountryFilter(response.data.results);
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

  const checkSelect = countries.filter(
    (item: MovieCountry) => item.iso_3166_1 === name
  );

  // console.log(checkSelect);

  return (
    <>
      <Section className="movie">
        <div className="select-type-movie">
          <div className="movie-selected" onClick={handleToggle}>
            {checkSelect && checkSelect.map((item) => item.english_name)}
            {checkSelect.length === 0 && "Select Country"}
            <div
              className={`movie-selected-icon${toggle ? " movie-selected-icon-active" : ""}`}
            >
              <KeyboardArrowDownRoundedIcon />
            </div>
          </div>

          <div
            className={`movie-select${toggle ? " movie-select-active" : ""}`}
          >
            {countries.map((country: MovieCountry, index) => (
              <p
                key={index}
                className="movie-select-href"
                onClick={() => handleSelect(country.iso_3166_1)}
              >
                {country.english_name}
              </p>
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
