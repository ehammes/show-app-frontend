import { useDispatch, useSelector } from "react-redux";
import { addReview } from '../Store/reviews';

export default function useReviews() {
  let reviewList = useSelector(state => state.reviews.list);
  let dispatch = useDispatch();

  let addToReviews = (review) => {
    dispatch(addReview(review));
  }

  return {
    reviewList,
    addToReviews,
  }
}