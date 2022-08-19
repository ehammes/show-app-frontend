import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShows } from './Store/shows';
import { getReviews } from './Store/reviews';
import { getUsers } from './Store/users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useShows from './Hooks/useShows';
import useReviews from './Hooks/useReviews';
import useUsers from './Hooks/useUsers';
import ShowDetails from './Components/Details/ShowDetails';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home/HomeReviews';
import Library from './Components/Library/Library';
import Login from './Components/Account/Login';
import UserLibrary from './Components/Account/UserLibrary';
import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShows());
    dispatch(getReviews());
    dispatch(getUsers());
  }, []);

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* homepage route */}
          <Route
            exact path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }>
          </Route>
          {/* library route */}
          <Route
            exact path="/library"
            element={
              <>
                <Library />
              </>
            }
          >
          </Route>
          {/* show details route */}
          <Route
            exact path="/details/:id"
            element={
              <>
                <ShowDetails />
              </>
            }
          >
          </Route>
          {/* user account route */}
          <Route
            exact path="/user/:id"
            element={
              <>
                <Header />
                <UserLibrary />
              </>
            }>
          </Route>
          {/* Login / Create Account */}
          <Route
            exact path="/login"
            element={
              <>
                <Login />
              </>
            }
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
