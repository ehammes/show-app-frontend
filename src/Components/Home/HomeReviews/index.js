import useShows from '../../../Hooks/useShows';
import useReviews from '../../../Hooks/useReviews';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import './style.css';

function Home(){
  
  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();

 

  return (
  <>
   
   {reviewList.slice(0,4).map((review, idx) => 
   <div className="homeReviews">
    <Grid>
      <Container key={`review-${idx}`}>
        "{review.review}" - {showList.map((show, idx) => {
          if(review.showId === show.id){
            return <p key={`show-${idx}`}>{show.title}</p>
          }
        }
        
        )}
      </Container>
    </Grid>
    </div>
    )}
  </>
  )
}

export default Home;