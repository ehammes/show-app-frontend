import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from './Store/shows';
import { getReviews } from './Store/reviews';
import useShows from './Hooks/useShows';
import useReviews from './Hooks/useReviews';

import './App.css';

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

      <h1>Show Library</h1>
      {showList.map((show, idx) => <p key={`show-${idx}`}>{show.name}</p>)}
      <h1>Reviews</h1>
      {reviewList.map((review, idx) => <p key={`review-${idx}`}>{review.description}</p>)}
    </div>



  );
}

export default App;
