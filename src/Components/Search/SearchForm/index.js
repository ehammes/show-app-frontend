// import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useShows from '../../../Hooks/useShows';
import axios from 'axios';
import { setMovieDbShows } from '../../../Store/shows';
import { addToList } from '../../../Hooks/useShows';
import { ImageListItem, Container, Grid, Button, ButtonGroup, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const SERVER = process.env.REACT_APP_SERVER || 3002;

function SearchForm() {

  const { movieDBShowList, addToList } = useShows();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.addShow.value;
    console.log('title: ', { params: { title } });
    let response = await axios.get(`${SERVER}/moviedb`, { params: { title } });
    console.log('response data: ', response.data);
    dispatch(setMovieDbShows(response.data));
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleClick = async (show) => {
    console.log('clicked show: ', show);
    let movieDbShowToAdd = {
      title: show.name,
      image: show.poster_path,
      description: 'a cool show',
      avgRating: 4,
      genre: 'drama',
      // uuid: 33,
    }
    console.log('normalized show to be added to db: ', movieDbShowToAdd);
    // dispatch(addToList(movieDbShowToAdd));
    await axios.post(`${SERVER}/show`, movieDbShowToAdd);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add New Show!</h2>
        <label>
          <span>Enter Show Title</span>
          <input id='addShow' name='add-show' type='text' required />
        </label>
        <label>
          <button type='submit'>Submit</button>
        </label>
      </form>
      <div>

        <h2>Select Title to Add:</h2>
      </div>

      <Container maxWidth="md">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movieDBShowList && movieDBShowList.map((show, idx) =>
            <Grid
              xs={2} sm={4} md={4}
              key={`show-${idx}`}
            >
              <Item
                sx={{ width: 250 }}
              >
                <h2>{show.name}</h2>
                <ImageListItem
                  sx={{ width: 250 }}
                  position="center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={`${show.image}`}
                    loading="lazy"
                  ></img>
                </ImageListItem>
                <ButtonGroup
                  variant="contained"
                  size="small"
                >
                  {/* <Button>Learn More</Button> */}
                  <Button onClick={() => handleClick(show)}>Select This Title</Button>
                </ButtonGroup>
              </Item>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default SearchForm;