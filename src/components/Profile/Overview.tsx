import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import SideBar from "./SideBar";
import { imageSrc } from "../../constants";
import "./style.scss";

function Overview() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") as any);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("User");
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
          <div className="overview-profile-btn" onClick={handleLogOut}>
            <p>Đăng xuất</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;
