import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useShows from '../../../Hooks/useShows';
import useReviews from '../../../Hooks/useReviews';
import { useDispatch } from 'react-redux';
import './style.css';
import { useParams } from 'react-router-dom';
import Header from '../../Header'
import Footer from '../../Footer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';



function ShowDetails({ someId }) {

  const params = useParams();
  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();
  const dispatch = useDispatch();

  let oneShow = showList.find(show => show.id === +params.id);

  function handleSubmit() {
    // console.log('review submitted');
  }

  return (
    <>
      <Header></Header>
      <div className='details-card'>
        <Card sx={{ maxWidth: 400 }}>
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
              <Typography variant="body3" color="text.primary">
                {oneShow.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className='show-reviews'>

        <Typography gutterBottom variant="h6" component="div">
          Reviews for {oneShow.title}
        </Typography>
        {reviewList.map((review, idx) =>
          <div className='single-review'>
            <Typography variant="body3" color="text.primary">
              "{review.review}"
            </Typography>
          </div>
        )}
      </div>
      <div className='leave-review'>

        <Typography gutterBottom variant="h6" component="div">
          Leave your own review:
        </Typography>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <div className='review-form'>

          <FormGroup
            sx={{
              '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Review"
              multiline
              maxRows={4}
            />
            <Button type="submit" variant="contained" style={{ width: '50%', margin: 'auto' }} >Submit</Button>
          </FormGroup>
        </div>
      </form>
      <Footer></Footer>
    </>
  );
}

export default ShowDetails;