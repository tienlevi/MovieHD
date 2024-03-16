import SideBar from "./SideBar";
import "./style.scss";

function Overview() {
  return (
    <>
      <header className="header-profile">
        <h2>Dashboard</h2>
      </header>
      <SideBar />
      <footer className="footer-profile">
        © FlixTV.template, 2021. Create by Dmitry Volkov
      </footer>
    </>
  );
}

export default Overview;
