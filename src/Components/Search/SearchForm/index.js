// import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useShows from '../../../Hooks/useShows';
import axios from 'axios';
import { getShows, setMovieDbShows } from '../../../Store/shows';
import { ImageListItem, Container, Grid, Button, ButtonGroup, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import './style.css';


const SERVER = process.env.REACT_APP_SERVER || 3002;

function SearchForm() {

  const { movieDBShowList } = useShows();
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
      description: 'You won\'t want to miss this binge-worthy show! Critics call it a tour-de-force of screenwriting and acting...',
      avgRating: 4,
      genre: 'drama',
      // uuid: 33,
    }
    console.log('normalized show to be added to db: ', movieDbShowToAdd);
    await axios.post(`${SERVER}/show`, movieDbShowToAdd);
    dispatch(getShows());
  }

  return (
    <>
      <div className='search-message'>

        <Typography gutterBottom variant="h6" component="div">
          Don't See Your Show? Search Here!</Typography>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <div className='search-form'>
          <FormGroup
            sx={{
              '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}>
            <TextField
              id="addShow"
              label="Title to Search"
            />
            <div className='search-button'>

              <Button type="submit" variant="contained" style={{ width: '50%', margin: 'auto' }} >Submit</Button>
            </div>
          </FormGroup>
        </div>
      </form>

      <div className='moviedb-shows'>
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

                    <Button onClick={() => handleClick(show)}>Select This Title</Button>
                  </ButtonGroup>

                </Item>
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default SearchForm;