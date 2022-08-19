import useShows from '../../../Hooks/useShows';
import useReviews from '../../../Hooks/useReviews';
import { Container } from '@mui/system';
import { ImageListItem, ImageList, ImageListItemBar, Button, Paper } from '@mui/material';

import './style.css';

function Home() {

  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();

  return (
    <div className='home-page'>
      <div className='home-shows'>
        <Paper elevation={4}>
          <Container maxWidth="md">
            <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={164} key={'imgList'}>
              {showList.slice(0, 9).map((item) => (
                <ImageListItem key={item.image}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.image}`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    position="bottom"
                  />
                </ImageListItem>

              ))}
            </ImageList>
          </Container>
        </Paper>
      </div>
      <div className='review-list'>

        <div className='explanation'></div>

        {reviewList.slice(0, 3).map((review, idx) =>
          <div className="homeReviews" key={`homeReviews-${idx}`}>
            <Container key={`review-${idx}`}>
              "{review.review}"{showList.map((show, idx) => {
                if (review.showId === show.id) {
                  return <p key={`show-${idx}`}> - User review of {show.title}</p>
                }
              }
              )}
            </Container>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;

