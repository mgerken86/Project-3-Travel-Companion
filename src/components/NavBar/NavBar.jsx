import './NavBar'
import { Link } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {

  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav>
      <span>Hello, {user.name}</span>
      &nbsp; | &nbsp;
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}
