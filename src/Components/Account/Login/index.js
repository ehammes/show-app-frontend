
import { useContext, useState } from "react";
import useForm from '../../../Hooks/form';
import { AuthContext } from "../../../Context/Auth";
import Header from '../../Header';
// import Footer from '../../Footer';
import { Container, FormControl, InputLabel, Input, Button, Accordion, AccordionSummary, Typography, FormHelperText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';
import { When } from "react-if";

// const SERVER = process.env.REACT_APP_SERVER


const Login = () => {


  const [defaultValues] = useState({})
  const { isLoggedIn, login } = useContext(AuthContext);
  const { handleChange, handleSubmit } = useForm(loginUser, defaultValues);
  const [expanded, setExpanded] = useState('login');

  // const [createSuccess, setCreateSuccess] = useState(null)
  // const [loginSuccess, setLoginSuccess] = useState(null)

  function loginUser({ username, password }) {
    login(username, password)
  }  

  /// Need to revisit for when a user provides invalid credentials


  // const handleSubmitCreate = async (event) => {
  //   event.preventDefault();
  //   const email = event.target.createEmail.value;
  //   const password = event.target.createPassword.value;
  //   let response = await axios.post(`${SERVER}/signup`, { email, password });
  //   console.log('response', response)
  //   if (response.statusText === 'Created') {
  //     setCreateSuccess(true)
  //   } else {
  //     setCreateSuccess(false)
  //   }
  //   console.log('createSuccess', createSuccess)
  // }

  const handleEventChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Header />
      <Typography variant='h3'>Login / Create an Account</Typography>
      <Container maxWidth="md">

        <When condition={!isLoggedIn}>
          <Accordion
            expanded={expanded === 'login'}
            onChange={handleEventChange('login')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography
                variant='h5'
              >Login</Typography>
            </AccordionSummary>
            <form
              onSubmit={handleSubmit}
              id="loginForm"
            >
              <div>
                <FormControl>

                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input
                    name="username"
                    onChange={handleChange}
                    required
                    sx={
                      { width: 750 }
                    }
                  />
                </FormControl>
              </div>
              <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input
                  name="password"
                  onChange={handleChange}
                  required
                  sx={
                    { width: 750 }
                  }
                />
              </FormControl>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                >Login</Button>
              </div>
              {isLoggedIn === true ?
                <p>Success!</p>
                :
                null
              }
              {isLoggedIn === false ?
                <p>Invalid Credentials</p>
                :
                null
              }
            </form>
          </Accordion>
        </When>

        {/* <Accordion
          expanded={expanded === 'createAccount'}
          onChange={handleEventChange('createAccount')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography
              variant='h5'
              expandIcon={<ExpandMoreIcon />}
            >Create an Account</Typography>
          </AccordionSummary>
          <form
            onSubmit={handleSubmitCreate}
            id="createForm"
          >
            <FormControl>
              <InputLabel htmlFor="my-input">Email Address</InputLabel>
              <Input
                id="createEmail"
                name="createEmail"
                required
                sx={
                  { width: 750 }

                }
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Password</InputLabel>
              <Input
                id="createPassword"
                name="createPassword"
                required
                sx={
                  { width: 750 }
                }
              />
              <FormHelperText id="helper-text">Must contain between 8-20 characters, letters and numbers only</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
            >Create Account</Button>
            {/* {createSuccess === true ? <p>Account has been created</p> : null}
            {createSuccess === false ? <p>Unable to create account</p> : null} */}
          {/* </form> */}

        {/* </Accordion> */}

      </Container>
    </>
  )
}

export default Login;