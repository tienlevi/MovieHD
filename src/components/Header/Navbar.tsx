import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../api/movie";
import { MovieGenre } from "../../interface/movie";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.scss";

interface Props {
  active: boolean;
}

function Navbar({ active }: Props) {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenres(response.data.genres);
    };
    getData();
  }, []);

  const handleClickGenre = () => {
    window.location.reload();
  };
  return (
    <nav className={active ? "nav-dropdown" : ""}>
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
              <li key={index} onClick={handleClickGenre}>
                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(5, 10).map((genre: MovieGenre, index: number) => (
              <li key={index} onClick={handleClickGenre}>
                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(10, 15).map((genre: MovieGenre, index: number) => (
              <li key={index} onClick={handleClickGenre}>
                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </div>
          <div className="menu-children-inside">
            {genres.slice(16).map((genre: MovieGenre, index: number) => (
              <li key={index} onClick={handleClickGenre}>
                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      </li>
      <li>
        <Link className="menu-parent" to="/tv-show">
          TV Show
        </Link>
      </li>
    </nav>
  );
}

export default Navbar;
