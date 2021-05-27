import React from "react";
import axios from "axios";
import useForm from "../../hooks/useForm";
import * as CONSTS from "../../utils/consts";

function AddMovieRating(props) {
  const [form, handleChange, handleSubmit] = useForm({
    rating: 1,
  });

  const onSubmit = handleSubmit((givenRating) => {
    console.log("givenRating:", givenRating);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    axios
      .post(
        `http://localhost:5000/api/movies/${props.movieId}/add-rating`,
        givenRating,
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((success) => {
        console.log("success:", success);
        props.updatesMovie(success.data.movie);
      })
      .catch((err) => {
        console.error(err.response);
      });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={form.rating}
            onChange={handleChange}
            name="rating"
            min="1"
            max="5"
          />
        </div>
        <button type="submit">Because of course</button>
      </form>
    </div>
  );
}

export default AddMovieRating;
