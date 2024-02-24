import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenre } from "../../api/movie";
import { MovieGenre } from "../../types";
import { getCountry } from "../../api/movie";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.scss";

function Navbar() {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [country, setCountry] = useState<[]>([]);
  const middleIndex = Math.floor(genres.length / 2);
  const firstHalf = genres.slice(0, middleIndex);
  const secondHalf = genres.slice(middleIndex);

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
      console.log(response);
      setGenres(response.data);
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
        <Link to="/">Genre</Link>
        <div className="header-arrow-down">
          <KeyboardArrowDownRoundedIcon />
        </div>
        <ul className="menu-children">
          <div className="menu-children-inside">
            {firstHalf.map((genre) => (
              <li key={genre.id}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {secondHalf.map((genre) => (
              <li key={genre.id}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      </li>
      <li>
        <Link to="/">Country</Link>
      </li>
      <li>
        <Link to="/">TV Shows</Link>
      </li>
      <li>
        <Link to="/">About us</Link>
      </li>
    </nav>
  );
}

export default Navbar;
