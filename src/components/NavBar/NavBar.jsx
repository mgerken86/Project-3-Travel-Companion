import "./NavBar.css";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  };

  return (
    <div className="navBar">
      <nav className="navContainer">
        <span className="logo">Travel Companions</span>
        <div className="navItems">
          <span>Where can we take you, {user.name}?</span>
          &nbsp; &nbsp;
          <Link className="navButton" to="/">
            Home
          </Link>
          &nbsp; | &nbsp;
          <Link className="navButton" to="/users/myAccount">
            My Account
          </Link>
          &nbsp; | &nbsp;
          <Link className="navButton" to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </nav>
      <SearchBar />
    </div>
  );
}
