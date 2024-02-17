import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="menu">
      <li>
        <Link to="/">Home</Link>
        <li className="submenu"></li>
      </li>
      <li>
        <Link to="/">Genre</Link>
        <li className="submenu"></li>
      </li>
      <li>
        <Link to="/">Country</Link>
        <li className="submenu"></li>
      </li>
      <li>
        <Link to="/">TV Shows</Link>
        <li className="submenu"></li>
      </li>
      <li>
        <Link to="/">Live</Link>
      </li>
    </nav>
  );
}

export default Navbar;
