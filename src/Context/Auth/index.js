import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

const SERVER = process.env.REACT_APP_SERVER

function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0)
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const login = async (username, password) => {

    const config = {
      baseURL: `${SERVER}`,
      url: '/signin',
      method: 'post',
      auth: {
        username,
        password,
      }
    }

    try {
      const response = await axios(config);
      console.log('response data', response.data)
      const { token, id } = response.data
      if (token) {
        try {
          _validateToken(token, id);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.log('error message', e.message)
    }
  }

  function _validateToken(token, id) {
    try {
      let validUser = jwt_decode(token);
      console.log('validUser', validUser)
      if (validUser) {
        setUser(validUser);
        setUserId(id)
        setIsLoggedIn(true);
        cookie.save('auth', token)
      }
    } catch (e) {
      setIsLoggedIn(false);
      setError(e)
    }
  }

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    setError(null);
    cookie.remove('auth');
  }

  useEffect(() => {

    let token = cookie.load('auth');

    if (token) {
      _validateToken(token);
    }
  }, []);

  const values = {
    isLoggedIn,
    user,
    error,
    userId,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
