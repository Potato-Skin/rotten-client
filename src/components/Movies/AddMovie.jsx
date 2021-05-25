import React from "react";
import useForm from "../../hooks/useForm";

function AddMovie() {
  const [form, handleChange, handleSubmit] = useForm({ title: "", body: "" });
  //   const [form, setForm] = React.useState({
  //     title: "",
  //     body: "",
  //   });

  //   function handleChange(e) {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //   }

  return (
    <form onSubmit={handleSubmit}>
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

export default AddMovie;

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
