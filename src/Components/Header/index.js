import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './style.css';

const Header = (props) => {

  return (
    <>
      <AppBar 
        position="static"
        color="transparent"
      >
        <Toolbar>
          <IconButton><Link to="/"><HomeIcon/></Link></IconButton>
          <Button><Link to="/library">Library</Link></Button>
          <h1>TV REVIEW APP</h1>
          <Button><Link to="/user/:id">My Account</Link></Button>
          <Button><Link to="/login">Login</Link></Button>
          <Button>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;