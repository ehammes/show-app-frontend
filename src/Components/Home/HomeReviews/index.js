import { connect } from 'react-redux';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getShows } from './Store/shows';
// import { selectOneShow } from '../../../Hooks/useShows';
// import useShows from '../../../Hooks/useShows';
import Header from '../../Header';
import Footer from '../../Footer';


const Home = (props) => {

console.log(props)

  return(
    
    <h1>Home!</h1>

  )
}

// const mapStateToProps = (state) => {
//   return {
//     shows: state.shows,
//   }
// }

// const mapDispatchToProps = {


// }

export default connect(Home);