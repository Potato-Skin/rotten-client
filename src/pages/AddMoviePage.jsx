import React from "react";
import * as MOVIE_SERVICE from "../service/movie.service";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

function AddMoviePage(props) {
  const [form, setForm] = React.useState({
    title: "",
    director: "",
    cast: "",
    dateOfRelease: 0,
    description: "",
    trailer: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    MOVIE_SERVICE.ADD_MOVIE(form, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.history.push(`${PATHS.MOVIES_PAGE}/${response.data.movie._id}`);
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
    //   API CALL TO CREATE MOVIE HERE+
  }

  return (
    <div>
      <h1>You are about to create a movie!!!!</h1>
      <h6>You are all powerfull, because you can create movieees</h6>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="The movie title"
            onChange={handleChange}
            value={form.title}
          />
        </div>
        <div>
          <label>Director</label>
          <input
            type="text"
            name="director"
            placeholder="The movie director"
            onChange={handleChange}
            value={form.director}
          />
        </div>
        <div>
          <label>Cast</label>
          <input
            type="text"
            name="cast"
            placeholder="The movie cast"
            onChange={handleChange}
            value={form.cast}
          />
        </div>
        <div>
          <label>Year of release</label>
          <input
            type="number"
            name="dateOfRelease"
            placeholder="The movie release year"
            onChange={handleChange}
            value={form.dateOfRelease}
          />
        </div>
        <div>
          <label>Description, korrekt</label>
          <input
            type="text"
            name="description"
            placeholder="The movie description"
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <div>
          <label>Trailer</label>
          <input
            type="text"
            name="trailer"
            placeholder="The movie trailer"
            onChange={handleChange}
            value={form.trailer}
          />
        </div>
        <button type="submit">Create da movie</button>
      </form>
    </div>
  );
}

export default AddMoviePage;
