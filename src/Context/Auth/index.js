import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import base64 from 'base-64';

export const AuthContext = React.createContext();

const SERVER = process.env.REACT_APP_SERVER

function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0)
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const login = async (email, password) => {

    // let encodedAuthStr = `Basic ${base64.encode(`${email}:${password}`)}`;
    const config = {
        baseURL: `${SERVER}`,
        url: '/signin',
        method: 'post',
        // headers: {
        //   'Authorization': encodedAuthStr
        // },
        auth: {
          email,
          password,
        }
      }

    const response = await axios(config);
      const { token } = response.data
      // console.log('response data', response.data)

    if(token) {
        try {
          _validateToken(token);
        } catch (e) {
          console.error(e);
        }
      }
    }

    function _validateToken(token, id) {
      try {
        let validUser = jwt_decode(token);
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
