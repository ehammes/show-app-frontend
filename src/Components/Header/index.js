import { useContext } from 'react';
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, IconButton, ButtonGroup } from "@mui/material";
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
        <div className='headtitle'>
          <h1>THE BINGE</h1>
        </div>
        <div className='navbutton'>
          <When condition={isLoggedIn}>
            <Button><Link to="/library">Library</Link></Button>
          </When>
          <Button><Link to="/library">Library</Link></Button>
          <Button><Link to="/user/:id">My Account</Link></Button>
           <When condition={!isLoggedIn}>
           <Button ><Link to="/login">Login</Link></Button>
          </When>
          <When condition={isLoggedIn}>
            <Button>Logout</Button>
          </When>
        </div>
      
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;