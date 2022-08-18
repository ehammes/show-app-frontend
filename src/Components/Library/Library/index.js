import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShows } from '../../../Store/shows';
// import { selectOneShow } from '../../../Hooks/useShows';
import useShows from '../../../Hooks/useShows';
// import Header from '../../Header';
// import Footer from '../../Footer';
import { ImageListItem, Container, Grid, Button, ButtonGroup, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import SearchForm from '../../Search/SearchForm';
import { Link } from 'react-router-dom';


const Library = () => {

  const { showList, addToList } = useShows();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getShows());
  // }, []);

  // console.log('showList', showList)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <h1>Show Library</h1>

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
                <ButtonGroup
                  variant="contained"
                  size="small"
                >
                  <Button
                    component={Link}
                    to={`/details/${show.id}`}
                  >Learn More</Button>
                  <Button>Add to My List</Button>
                </ButtonGroup>
              </Item>
            </Grid>
          )}
        </Grid>
      </Container>
      <Button>Add a TV Show</Button>
      <SearchForm />
    </>
  )
}

export default Library;