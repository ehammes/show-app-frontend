import useShows from '../../../Hooks/useShows';
import useReviews from '../../../Hooks/useReviews';
import { Container } from '@mui/system';
import './style.css';

function Home(){
  
  const { showList, addToList } = useShows();
  const { reviewList, addToReviews } = useReviews();

  return (
  <>
  
   {reviewList.slice(0,4).map((review, idx) => 
   <div className="homeReviews" key={`homeReviews-${idx}`}>
      <Container key={`review-${idx}`}>
        "{review.review}"{showList.map((show, idx) => {
          if(review.showId === show.id){
            return <p key={`show-${idx}`}>{show.title}</p>
          }
        }    
        )}
      </Container>
    </div>
    )}
  </>
  )
}

export default Home;

