import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import SideBar from "./SideBar";
import "./style.scss";

function Overview() {
  const navigate = useNavigate();

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
      <div className="overview-profile">
        <h1>Overview</h1>
        <p>Name: Nguyễn Trạch Tiến</p>
        <p>Email: nguyentrachtien2401@gmail.com</p>
        <p>Phone Number: 0123456789</p>
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <footer className="footer-profile">
        © FlixTV.template, 2021. Create by Dmitry Volkov
      </footer>
    </>
  );
}

export default Overview;
