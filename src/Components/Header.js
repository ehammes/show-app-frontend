import { Button } from "@mui/material";

// needs isLoggedIn/notLoggedIn function for conditional rendering
const Header = (props) => {
  
 
  return (
    <>
      <div className="header">
        <Button>Library</Button> 
        <h1>TV REVIEW APP</h1>
        <Button>My Account</Button>
        <Button>Logout</Button>
        <Button>Login</Button>
    
      </div>
    </>
  )
}

export default Header;