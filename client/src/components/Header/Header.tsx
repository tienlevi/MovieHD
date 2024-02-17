import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Genre } from "../../api/movie";
import { MovieGenre } from "../../types";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "./style.scss";

function Header() {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

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
        <img
          src={require("../../assets/Img/logo.png")}
          alt=""
          width={175}
          height={37}
        />
      </div>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Genre</Link>
          <ul className="menu-children">
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
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
          <LightModeIcon />
        </div>
        <div className="header-btn">
          <button>Sign In</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
