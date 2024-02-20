import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Genre } from "../../api/movie";
import { MovieGenre } from "../../types";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LoginIcon from "@mui/icons-material/Login";
import "./style.scss";

function Header() {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const middleIndex = Math.floor(genres.length / 2);
  const firstHalf = genres.slice(0, middleIndex);
  const secondHalf = genres.slice(middleIndex);

  useEffect(() => {
    const getData = async () => {
      const response: any = await Genre();
      setGenres(response.data.genres);
    };
    getData();
  }, []);
  return (
    <header className="header">
      <div>
        <img src="../../assets/Img/logo.png" alt="" width={175} height={37} />
      </div>
      <nav>
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
      <div className="header-icon-btn">
        <div className="header-icon">
          <SearchIcon />
        </div>
        <div className="header-icon">
          <LightModeOutlinedIcon />
        </div>
        <Link to="/" className="header-btn">
          <LoginIcon />
          <p>Sign In</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
