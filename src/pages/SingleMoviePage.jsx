import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import AddMovieForm from "../components/Movies/AddMovie";

function SingleMoviePage(props) {
  console.log("props:", props);
  const [singleMovie, setSingleMovie] = useState({});
  const [addReview, setAddReview] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.movieId}`)
      .then((response) => {
        console.log("response:", response);
        setSingleMovie(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.match.params.movieId]);

  return (
    <div>
      {/* <Component /> */}
      <h2>{singleMovie.title}</h2>
      <img src={singleMovie.coverPic} style={{ width: "300px" }} alt="Dayman" />
      {singleMovie.trailer && (
        <ReactPlayer url={singleMovie.trailer} controls />
      )}
      <h1>Ratings "For after"</h1>
      <h1>Time for comments</h1>
      {/* <button onClick={() => setAddReview(!addReview)}>Add a review</button> */}
      <button onClick={() => setAddReview((currentValue) => !currentValue)}>
        Add a review
      </button>
      {addReview && <AddMovieForm />}
    </div>
  );
}

export default SingleMoviePage;

// function Component() {
//   const [counter, setCounter] = React.useState(0);
//   function increment() {
//     setCounter((mufasa) => mufasa + 1);
//     setCounter((mufasa) => mufasa + 1);
//   }

//   return (
//     <div>
//       <button onClick={increment}>+</button>
//       <h1>{counter}</h1>
//     </div>
//   );
// }
