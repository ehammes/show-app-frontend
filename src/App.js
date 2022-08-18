import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from './Store/shows';
import { getReviews } from './Store/reviews';
import useShows from './Hooks/useShows';
import useReviews from './Hooks/useReviews';
import ShowDetails from './Components/Details/ShowDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home/HomeReviews';
import Library from './Components/Library/Library';

import './App.css';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER || 3002;

function App() {

  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShows());
    dispatch(getReviews());
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
            exact path="/account/:id"
            element={
              <>
                {/* <Account? UserLibrary? /> */}
              </>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
