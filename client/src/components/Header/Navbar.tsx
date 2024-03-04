import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../api/movie";
import { MovieGenre } from "../../types";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.scss";

function Navbar() {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response.data.genres);
    };
    getData();
  }, []);
  return (
    <nav>
      <img src="" alt="" />
      <li>
        <Link className="menu-parent" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="menu-parent" to="/country">
          Country
        </Link>
      </li>
      <li>
        <Link className="menu-parent" to="/">
          Genre
        </Link>
        <div className="header-arrow-down">
          <KeyboardArrowDownRoundedIcon />
        </div>
        <ul className="menu-children">
          <div className="menu-children-inside">
            {genres.slice(0, 5).map((genre: MovieGenre, index: number) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(5, 10).map((genre: MovieGenre, index: number) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(10, 15).map((genre: MovieGenre, index: number) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(16).map((genre: MovieGenre, index: number) => (
              <li key={index}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      </li>
      <li>
        <Link className="menu-parent" to="/">
          TV Shows
        </Link>
      </li>
    </nav>
  );
}

export default Navbar;
