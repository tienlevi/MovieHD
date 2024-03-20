import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { imageSrc } from "../../constants";
import "./style.scss";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/">
            <img src={imageSrc.logo} alt="" />
          </Link>
        </div>
        <div className="sidebar-profile">
          <img
            src="https://flixtv.volkovdesign.com/admin/img/user.svg"
            alt=""
          />
          <p>Admin</p>
        </div>
        <div className="sidebar-menu">
          <div className="sidebar-item">
            <div className="sidebar-item-icon">
              <HomeIcon />
            </div>
            <div className="sidebar-item-text">
              <p>Dashboard</p>
            </div>
          </div>
          <div className="sidebar-item">
            <div className="sidebar-item-icon">
              <SettingsIcon />
            </div>
            <div className="sidebar-item-text">
              <p>Change Infomation</p>
            </div>
          </div>
          <div className="sidebar-item">
            <div className="sidebar-item-icon">
              <StarRateRoundedIcon />
            </div>
            <div className="sidebar-item-text">
              <p>Favorite Movies</p>
            </div>
          </div>
          <div className="sidebar-item">
            <div className="sidebar-item-icon">
              <LogoutIcon />
            </div>
            <div className="sidebar-item-text">
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
