import useShows from '../../../Hooks/useShows';
import { AuthContext } from '../../../Context/Auth/index'
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ImageListItem, Container, ImageList, ImageListItemBar, Button, Paper} from '@mui/material';

import './style.css';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

function UserLibrary() {

  // hard code - switch to useContext
  const { userId } = useContext(AuthContext);

  const id = userId;
  
  console.log('ID ID ID', id);

  const { showList, addToList } = useShows();
  const [userShowList, setUserShowList] = useState([]);

  useEffect(() => {
    (async () => {
     
      let response = await axios.get(`${SERVER}/user/${userId}`);
      let reviews = response.data;
      let showIds = reviews.reduce((ids, show) => {
        ids.push(show.showId);
        return ids;
      }, []);
      let userShows = showList.filter(show => showIds.includes(show.id));
      setUserShowList(userShows);
    })();
  }, [])


  return (
    <>

      <h1>My Shows</h1>
      <div className='userLibrary'>
      <Paper elevation={4}>
      <Container maxWidth="md">
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164} key={'imgList'}>
          {userShowList.map((item) => (
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
      <div className='browseDiv'>
        <Button variant="outlined"><Link to="/library">Browse Shows</Link></Button>
      </div>
    </>
  )
}

export default UserLibrary;