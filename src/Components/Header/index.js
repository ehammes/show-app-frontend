import { useContext } from 'react';
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './style.css';

const Header = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);

  function logoutUser() {
    logout()
  }

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
      >
        <Toolbar>
          <IconButton><Link to="/"><HomeIcon /></Link></IconButton>
          <When condition={isLoggedIn}>
            <Button><Link to="/library">Library</Link></Button>
          </When>
          <h1>TV REVIEW APP</h1>
          <When condition={isLoggedIn}>
            <Button><Link to="/user/:id">My Account</Link></Button>
          </When>
          <When condition={!isLoggedIn}>
            <Button><Link to="/login">Login</Link></Button>
          </When>
          <When condition={isLoggedIn}>
            <Button
              component={Link}
              to={'/'}
              onClick={logoutUser}>Logout</Button>
          </When>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;