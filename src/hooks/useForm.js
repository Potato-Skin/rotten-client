import { useState } from "react";

export default function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return [form, handleChange, handleSubmit];
}
