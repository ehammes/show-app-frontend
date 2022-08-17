import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from './Store/shows';
import { getReviews } from './Store/reviews';
import useShows from './Hooks/useShows';
import useReviews from './Hooks/useReviews';
import Header from './Components/Header';

import './App.css';
import axios from 'axios';

function App() {

  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShows());
    dispatch(getReviews());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const show = event.target.value;
    console.log(show);
    // this will ultimately get from our server/newShow route to get matching shows from MovieDB API
    let response = await axios.get('https://api-js401.herokuapp.com/api/v1/products', show);
    console.log(response);
  }

  return (

    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Add New Show!</h2>
        <label>
          <span>Enter Show Title</span>
          <input name='add-show' type='text' required />
        </label>
        <label>
          <button type='submit'>Submit</button>
        </label>
      </form>

      <h1>Show Library</h1>
      {showList.map((show, idx) => <p key={`show-${idx}`}>{show.name}</p>)}
      <h1>Reviews</h1>
      {reviewList.map((review, idx) => <p key={`review-${idx}`}>{review.description}</p>)}
    </div>

  );
}

export default App;
