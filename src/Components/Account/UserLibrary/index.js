// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useState } from 'react';

// import { selectOneShow } from '../../../Hooks/useShows';
import Header from '../../Header';
// import Footer from '../../Footer';
import { Container, FormControl, InputLabel, Input, FormHelperText, Button, Accordion, AccordionSummary, Typography, Snackbar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
let base64 = require('base-64');

const SERVER = process.env.REACT_APP_SERVER

const Login = () => {

  const [expanded, setExpanded] = useState('login');
  const [createSuccess, setCreateSuccess] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

/// Need to revisit for when a user provides invalid credentials

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;
    let encodedAuthStr = `Basic ${base64.encode(`${email}:${password}`)}`;
    const config = {
      headers: {
        'Authorization': encodedAuthStr
      }
    }
    // const config = {
    //   baseURL: 'https://api-js401.herokuapp.com',
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
    let response = await axios.post(`${SERVER}/signin`, null, config);
    console.log('response,', response)
    if (response.statusText === 'OK') {
      setLoginSuccess(true)
      setIsLoggedIn(true);
    } else {
      setLoginSuccess(false)
    }
    if (response.status === '403') {
      console.log('error', 'invalid login')
    }
    console.log('loginSuccess', loginSuccess)
  }

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    const email = event.target.createEmail.value;
    const password = event.target.createPassword.value;
    let response = await axios.post(`${SERVER}/signup`, { email, password });
    console.log('response', response)
    if (response.statusText === 'Created') {
      setCreateSuccess(true)
    } else {
      setCreateSuccess(false)
    }
    console.log('createSuccess', createSuccess)
  }


  return (
    <>
      <Header />
      <Typography variant='h3'>Login / Create an Account</Typography>
      <Container maxWidth="md">

        <Accordion
          expanded={expanded === 'login'}
          onChange={handleChange('login')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography
              variant='h5'
            >Login</Typography>
          </AccordionSummary>
          <form
            onSubmit={handleSubmitLogin}
            id="loginForm"
          >
            <div>
              <FormControl>

                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                  id="loginEmail"
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
            {loginSuccess === true ?
              <p>Success!</p>
              :
              null
            }
            {loginSuccess === false ?
              <p>Invalid Credentials</p>
              :
              null
            }
          </form>
        </Accordion>

        <Accordion
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
            {createSuccess === true ? <p>Account has been created</p> : null}
            {createSuccess === false ? <p>Unable to create account</p> : null}
          </form>

        </Accordion>

      </Container>
    </>
  )
}

export default Login;