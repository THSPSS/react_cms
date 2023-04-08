import "../css/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div id="menu_bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/message">Message</Link>
        </li>
        <li>
          <Link to="/boardlist/1">Board</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
