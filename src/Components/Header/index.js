import { useContext } from 'react';
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";
import { Link } from 'react-router-dom';
import { Button, Typography } from "@mui/material";
import './style.css';

const Header = () => {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="header">
        <When condition={isLoggedIn}>
          <Button><Link to="/library">Library</Link></Button>
        </When>
        <h1>TV REVIEW APP</h1>
        <Button><Link to="/account/:id">My Account</Link></Button>
        <When condition={!isLoggedIn}>
          <Button><Link to="/login">Login</Link></Button>
        </When>
        <When condition={isLoggedIn}>
          <Button>Logout</Button>
        </When>

      </div>
    </>
  )
}

export default Header;