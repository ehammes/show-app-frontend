import useShows from '../../../Hooks/useShows';
import useUsers from '../../../Hooks/useUsers';
import useReviews from '../../../Hooks/useReviews';

import { ImageListItem, Container, Grid, Button, ButtonGroup, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import './style.css';


function UserLibrary(){
  
  const { showList, addToList } = useShows();
  const { userList, addToUserList } = useUsers();
  const { reviewList, addToReviews } = useReviews();


  console.log('USER LIST', userList);
  console.log('SHOW LIST', showList);
  console.log('REVIEWS LIST', reviewList);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
   <>
      <h1>My Shows</h1>

      <Container maxWidth="md">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {showList.map((show, idx) =>
            <Grid
              xs={2} sm={4} md={4}
              key={`show-${idx}`}
            >
              <Item
                sx={{ width: 250 }}
              >
                <h2>{show.title}</h2>
                <ImageListItem
                  sx={{ width: 250 }}
                  position="center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.image}`}
                    alt={`${show.image}`}
                    loading="lazy"
                  ></img>
                </ImageListItem>
          
              </Item>
            </Grid>
          )}
        </Grid>
      </Container>
  </>
  )
}

export default UserLibrary;