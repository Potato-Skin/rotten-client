import axios from "axios";
import React from "react";
import useForm from "../../hooks/useForm";
import * as CONSTS from "../../utils/consts";

function AddMovieReview(props) {
  const [form, handleChange, handleSubmit] = useForm({ title: "", body: "" });

  const onSubmit = handleSubmit((formValues) => {
    console.log("formValues:", formValues);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    console.log("accessToken:", accessToken);
    axios
      .post(
        `http://localhost:5000/api/movies/${props.movieId}/add-review`,
        formValues,
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
        console.log("HERE?");
        console.error(err.response);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label></label>
        <input
          type="text"
          name="body"
          value={form.body}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sad because its true</button>
    </form>
  );
}

export default AddMovieReview;

// function useForm(formObj) {
//   const [form, setForm] = React.useState(formObj);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return [form, handleChange, handleSubmit];
// }
