import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import "./style.scss";
import Navbar from "./Navbar";
import { imageSrc } from "../../constants";

function Header() {
  return (
    <header className="header">
      <div>
        <img src={imageSrc.logo} alt="" width={175} height={37} />
      </div>
      <Navbar />
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
