import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function Avatar({ img }: { img: string }) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("User");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
        <div className="dropdown-profile-item" onClick={handleLogOut}>
          <LogoutIcon /> <span>Logout</span>
        </div>
      </div>
    </>
  );
}

export default Avatar;
