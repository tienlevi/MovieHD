import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenre, getCountry } from "../../api/movie";
import { MovieCountry, MovieGenre } from "../../types";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.scss";

function Navbar() {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [country, setCountry] = useState<MovieCountry[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenre();
      setGenres(response.data.genres);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getCountry();
      setCountry(response.data);
    };
    getData();
  }, []);
  return (
    <nav>
      <img src="" alt="" />
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Country</Link>
      </li>
      <li>
        <Link to="/">TV Shows</Link>
      </li>
      <li>
        <Link to="/">Genre</Link>
        <div className="header-arrow-down">
          <KeyboardArrowDownRoundedIcon />
        </div>
        <ul className="menu-children">
          <div className="menu-children-inside">
            {genres.slice(0, 6).map((genre, index) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(7, 13).map((genre, index) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(14).map((genre, index) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      </li>
    </nav>
  );
}

export default Navbar;
