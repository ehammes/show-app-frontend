import { useDispatch, useSelector } from "react-redux";
import { addShow, selectShow } from '../Store/shows';

export default function useShows() {
  let showList = useSelector(state => state.shows.list);
  let dispatch = useDispatch();

  let addToList = (show) => {
    dispatch(addShow(show));
  }

  let selectOneShow = (show) => {
    dispatch(selectShow(show));
  }

  return {
    showList,
    addToList,
    selectOneShow,
  }
}