import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import useAuthStageChange from "../../hooks/useAuthStageChange";
import { auth } from "../../config/firebase";
import SideBar from "./SideBar";
import { imageSrc } from "../../constants";
import "./style.scss";

function Overview() {
  const { user, setUser } = useAuthStageChange();
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      setUser({});
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="header-profile">
        <Link to="/">
          <img src={imageSrc.logo} alt="" width={175} height={37} />
        </Link>
      </header>
      <SideBar />
      <main>
        <div className="overview-profile">
          <h1>Trang chủ</h1>
          <img src={user?.photoURL} alt="" />
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <div className="overview-profile-btn" onClick={LogOut}>
            <p>Đăng xuất</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;
