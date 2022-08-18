import { useDispatch, useSelector } from "react-redux";
import { addShow, selectShow, setMovieDbShows } from '../Store/shows';

export default function useShows() {
  let showList = useSelector(state => state.shows.list);
  let movieDBShowList = useSelector(state => state.shows.searchList);
  let dispatch = useDispatch();

  let addToList = (show) => {
    dispatch(addShow(show));
  }

  let selectOneShow = (show) => {
    dispatch(selectShow(show));
  }

  let setMovieDbShows = (shows) => {
    dispatch(setMovieDbShows(shows));
  }

  return {
    showList,
    addToList,
    selectOneShow,
    setMovieDbShows,
    movieDBShowList,
  }
}