
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/Auth";
import useForm from '../../../Hooks/form';
import Header from '../../Header';
import Footer from '../../Footer';
import { Container, FormControl, InputLabel, Input, Button, Accordion, AccordionSummary, Typography, FormHelperText, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { When } from "react-if";

import './style.css';

const SERVER = process.env.REACT_APP_SERVER


const Login = () => {

  const { isLoggedIn, login } = useContext(AuthContext);
  const [defaultValues] = useState({})
  const [createSuccess, setCreateSuccess] = useState(null)
  const { handleChange, handleSubmit } = useForm(loginUser, defaultValues);
  const [expanded, setExpanded] = useState('login');


  function loginUser({ username, password }) {
    login(username, password)
  }

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    const email = event.target.createEmail.value;
    const password = event.target.createPassword.value;
    let response = await axios.post(`${SERVER}/signup`, { email, password });
    // console.log('response', response)
    if (response.statusText === 'Created') {
      setCreateSuccess(true)
    } else {
      setCreateSuccess(false)
    }
    // console.log('createSuccess', createSuccess)
  }

  const handleEventChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <When condition={isLoggedIn}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Success!
          </Alert>
        </When>
        <When condition={!isLoggedIn}>
          <div
            className='sign-account'
          >
            <Typography variant='h5'>Signin to your account</Typography>
          </div>
          <Accordion
            expanded={expanded === 'login'}
            onChange={handleEventChange('login')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography
                variant='h6'
              >Login</Typography>
            </AccordionSummary>
            <form
              onSubmit={handleSubmit}
              id="loginForm"
            >
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
              <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>

                  <Input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    required
                    sx={
                      { width: 750 }
                    }
                  />
              </FormControl>
              <div
                className='button'
              >
                <Button
                  type="submit"
                  variant="contained"
                >Login</Button>
              </div>
            </form>
          </Accordion>
        </When>

        <When condition={!isLoggedIn}>
          <div
            className='sign-account'
          >
            <Typography variant='h5'>Create Account</Typography>
          </div>
          <Accordion
            expanded={expanded === 'createAccount'}
            onChange={handleEventChange('createAccount')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography
                variant='h6'
              >Create an Account</Typography>
            </AccordionSummary>
            <form
              onSubmit={handleSubmitCreate}
              id="createForm"
            >
              <FormControl>
                <InputLabel htmlFor="my-input">Email Address</InputLabel>
                <Input
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
                  name="createPassword"
                  type="password"
                  required
                  sx={
                    { width: 750 }
                  }
                />
                <FormHelperText id="helper-text">Must contain between 8-20 characters, letters and numbers only</FormHelperText>
              </FormControl>
              <div
                className='button'
              >
                <Button
                  type="submit"
                  variant="contained"
                >Create Account</Button>
              </div>
              <When condition={isLoggedIn}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Account created successfully! Please Login.
                </Alert>
              </When>
              {createSuccess === true
                ?
                <Alert
                  icon={<CheckIcon fontSize="inherit" />} severity="success"
                >
                  Account created successfully! Please Login.
                </Alert>
                :
                null
              }
              {createSuccess === false ? <p>Unable to create account, please try again.</p> : null}
            </form>
          </Accordion>
        </When>

      </Container>
      <Footer />
    </>
  )
}

export default Login;