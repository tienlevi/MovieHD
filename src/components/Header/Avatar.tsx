import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import useAuth from "../../hooks/useAuth";

function Avatar({ img }: { img: string }) {
  const { setUser } = useAuth();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const LogOut = async () => {
    try {
      setUser({});
      await signOut(auth);
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
        <div className="dropdown-profile-item" onClick={LogOut}>
          <LogoutIcon /> <span>Logout</span>
        </div>
      </div>
    </>
  );
}

export default Avatar;
