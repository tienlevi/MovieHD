import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { imageSrc } from "../../constants";
import "./style.scss";

function SideBar() {
  return (
    <>
      <div className="sidebar">
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
