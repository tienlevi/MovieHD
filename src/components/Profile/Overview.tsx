import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import SideBar from "./SideBar";
import "./style.scss";

function Overview() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") as any);
  console.log(user);

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
        <h2>Dashboard</h2>
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
