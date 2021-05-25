import React, { useEffect, useState } from "react";
import axios from "axios";

function SingleMoviePage(props) {
  console.log("props:", props);
  const [singleMovie, setSingleMovie] = useState({});

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
      <h2>{singleMovie.title}</h2>
      <img src={singleMovie.coverPic} style={{ width: "300px" }} alt="Dayman" />
    </div>
  );
}

export default SingleMoviePage;
