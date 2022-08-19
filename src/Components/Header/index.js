import { useContext } from 'react';
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './style.css';

const Header = () => {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <AppBar 
        position="static"
        color="transparent"
      >
        <Toolbar>
          <IconButton><Link to="/"><HomeIcon/></Link></IconButton>
          <When condition={isLoggedIn}>
            <Button><Link to="/library">Library</Link></Button>
          </When>
          <Button><Link to="/library">Library</Link></Button>
          <h1>TV REVIEW APP</h1>
          <Button><Link to="/user/:id">My Account</Link></Button>
           <When condition={!isLoggedIn}>
           <Button><Link to="/login">Login</Link></Button>
          </When>
          <When condition={isLoggedIn}>
            <Button>Logout</Button>
          </When>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;