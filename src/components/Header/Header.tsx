import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LoginIcon from "@mui/icons-material/Login";
import "./style.scss";
import Navbar from "./Navbar";
import { imageSrc } from "../../constants";
import Avatar from "./Avatar";
import useAuth from "../../hooks/useAuth";
import { AppProvider } from "../../context/AppContext";

function Header() {
  const { theme, toggleTheme } = useContext(AppProvider);
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { user } = useAuth();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    window.location.href = `/search?q=${search}`;
  };

  return (
    <header className={`header ${theme === "light" && "header-light-mode"}`}>
      <div className="header-img">
        <img
          src={imageSrc.logo}
          alt=""
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
        />
        <img
          src={imageSrc.logoName}
          alt=""
          width={125}
          height={50}
          style={{ objectFit: "cover", marginLeft: 8 }}
        />
      </div>
      <Navbar active={toggleMenu} />
      <div className="header-icon-btn">
        <div className="header-icon" onClick={handleToggle}>
          <SearchIcon />
        </div>
        <div className="header-icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </div>
        <div
          className="header-icon header-icon-menu"
          onClick={handleToggleMenu}
        >
          <MenuRoundedIcon />
        </div>
        {user ? (
          <Avatar img={user?.photoURL} />
        ) : (
          <Link to="/signin" className="header-btn">
            <LoginIcon />
            <p>Sign In</p>
          </Link>
        )}
        <form
          onSubmit={handleSearch}
          className={`search-bar${toggle ? " search-bar-active" : ""}`}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie..."
          />
          <button type="submit" className="search-bar-icon">
            <SearchIcon />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
