import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import './style.css';

const Header = (props) => {

  return (
    <>
      <div className="header">
      <Button><Link to="/library">Library</Link></Button>
        <h1>TV REVIEW APP</h1>
        <Button><Link to="/account/:id">My Account</Link></Button>
        <Button>Logout</Button>
        <Button>Login</Button>

      </div>
    </>
  )
}

export default Header;