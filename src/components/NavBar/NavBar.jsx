import './NavBar.css'
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar({ user, setUser, setSearch }) {

  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <div className='navBar'>
      <nav>
        <span>Where can we take you, {user.name}?</span>
        &nbsp; | &nbsp;
        <Link to="/users/myAccount">My Account</Link>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>Log Out</Link>
      </nav>
      <SearchBar setSearch={setSearch}/>
    </div>
  )
}
