import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import useShows from '../../../Hooks/useShows';
import useReviews from '../../../Hooks/useReviews';
import { useDispatch } from 'react-redux';
import './style.css';
import { useParams } from 'react-router-dom';
import Header from '../../Header'
import Footer from '../../Footer'

function ShowDetails({ someId }) {

  const params = useParams();
  console.log('params', params);

  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();
  const dispatch = useDispatch();

  let oneShow = showList.find(show => show.id === +params.id);

  function handleSubmit() {

  }

  console.log('one Show: ', oneShow);

  return (
    <>
      <Header></Header>
      <div className='details-card'>
        <Card sx={{ maxWidth: 800 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              // height="600"
              image={`https://image.tmdb.org/t/p/w500${oneShow.image}`}
              alt={oneShow.description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {oneShow.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {oneShow.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button size="small" color="primary">
            Leave a Review to add to your library</Button> */}
          </CardActions>
        </Card>
        <div className='review-form'>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Leave a Review Here:</span>
              <input id='addShow' name='add-show' type='text' required />
            </label>
            <label>
              <button type='submit'>Submit</button>
            </label>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );

}

// const mapStateToProps = (state, originalProps) => ({
//   someId: originalProps.match.params.id,
// });

export default ShowDetails;