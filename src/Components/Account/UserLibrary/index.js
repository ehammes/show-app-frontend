import useShows from '../../../Hooks/useShows';
import { useEffect, useState } from 'react';

import { ImageListItem, Container, ImageList, ImageListItemBar, IconButton, Button } from '@mui/material';


import './style.css';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;


function UserLibrary() {

  // hard code - switch to useContext
  const id = 1;

  const { showList, addToList } = useShows();
  const [userShowList, setUserShowList] = useState([]);
  console.log('SHOW LIST', showList);


  useEffect(() => {
    (async () => {
      let response = await axios.get(`${SERVER}/user/${id}`);
      let reviews = response.data;
      let showIds = reviews.reduce((ids, show) => {
        ids.push(show.showId);
        return ids;
      }, []);
      console.log('SHOW IDS', showIds);
      let userShows = showList.filter(show => showIds.includes(show.id));

      setUserShowList(userShows);
      console.log('USER SHOWS', userShows);
    })();
  }, [])


  return (
    <>
      <h1>My Shows</h1>

      <Container maxWidth="md">
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {userShowList.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`https://via.placeholder.com/150`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                  </IconButton>
                }
              />
              {/* <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              /> */}
            </ImageListItem>

          ))}
        </ImageList>
      </Container>
      <Button>Browse Shows</Button>
    </>
  )
}

export default UserLibrary;