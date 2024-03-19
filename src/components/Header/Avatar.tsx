import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Avatar({ img }: { img: string }) {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <img
        src={img}
        alt=""
        width={50}
        height={50}
        onClick={handleToggle}
        style={{ cursor: "pointer" }}
      />
      <div
        className={`dropdown-profile${toggle ? " dropdown-profile-active" : ""}`}
      >
        <Link to="/profile" className="dropdown-profile-item">
          <AccountCircleIcon /> <span>Profile</span>
        </Link>
        <div className="dropdown-profile-item">
          <LogoutIcon /> <span>Logout</span>
        </div>
      </div>
    </>
  );
}

export default Avatar;
