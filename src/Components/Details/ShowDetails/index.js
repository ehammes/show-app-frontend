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

function ShowDetails() {

  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();
  const dispatch = useDispatch();

  let oneShow = {
    img: showList[0].image,
    title: showList[0].title,
    genre: showList[0].genre,
    rating: showList[0].avgRating,
    description: showList[0].description,
  }

  console.log(oneShow);

  return (

    <Card sx={{ maxWidth: 800 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="140"
          image={require('../ShowDetails/the_bear.jpg')}
          alt="cover image for The Bear"
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
        <Button size="small" color="primary">
          Add To My Shows!
        </Button>
      </CardActions>
    </Card>

  );

}

export default ShowDetails;