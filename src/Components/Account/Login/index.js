
import { useContext, useState } from "react";
import useForm from '../../../Hooks/form';
import { AuthContext } from "../../../Context/Auth";
import Header from '../../Header';
// import Footer from '../../Footer';
import { Container, FormControl, InputLabel, Input, Button, Accordion, AccordionSummary, Typography, FormHelperText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';
// let base64 = require('base-64');
// import { When } from "react-if";


// const SERVER = process.env.REACT_APP_SERVER

const Login = () => {


  const [defaultValues] = useState({})
  const { isLoggedIn, login } = useContext(AuthContext);
  const { handleChange, handleSubmit } = useForm(loginUser, defaultValues);
  const [expanded, setExpanded] = useState('login');
  // const [createSuccess, setCreateSuccess] = useState(null)
  // const [loginSuccess, setLoginSuccess] = useState(null)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState('')

  function loginUser({ email, password }) {
    console.log('email', email)
    console.log('password', password)
    login(email, password)
  }


  /// Need to revisit for when a user provides invalid credentials

  // const handleSubmitLogin = async (event) => {
  //   event.preventDefault();
  //   const email = event.target.loginEmail.value;
  //   const password = event.target.loginPassword.value;
  //   let encodedAuthStr = `Basic ${base64.encode(`${email}:${password}`)}`;
  //   const config = {
  //     headers: {
  //       'Authorization': encodedAuthStr
  //     }
  //   }
  // const config = {
  //   baseURL: '',
  //   url: '/signin',
  //   method: 'post',
  //   // headers: {
  //   //   'Authorization': `Basic ${basicEncoding}`
  //   // },
  //   auth: {
  //     username,
  //     password,
  //   }
  // }
  // let response = await axios.post(`${SERVER}/signin`, null, config);
  // console.log('response,', response)
  // if (response.statusText === 'OK') {
  //   setLoginSuccess(true)
  //   setIsLoggedIn(true);
  //   setUser(response.data)
  // } else {
  //   setLoginSuccess(false)
  // }
  // if (response.status === '403') {
  //   console.log('error', 'invalid login')
  // }
  // console.log('loginSuccess', loginSuccess)
  // }




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

        {/* <When condition={!isLoggedIn}> */}
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
                    id="loginEmail"
                    name="email"
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
                  id="loginPassword"
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
              {/* {loginSuccess === true ?
                <p>Success!</p>
                :
                null
              }
              {loginSuccess === false ?
                <p>Invalid Credentials</p>
                :
                null
              } */}
            </form>
          </Accordion>
        {/* </When> */}

        {/* <Accordion
          expanded={expanded === 'createAccount'}
          onChange={handleChange('createAccount')}
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