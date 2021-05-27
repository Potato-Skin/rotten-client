import React from "react";
import * as AUTH_SERVICE from "../service/auth.service";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import useForm from "../hooks/useForm";

// GLOBAL STATE
// React Context, Redux, Apollo (GraphQl)

// Local State

function SignupPage(props) {
  const [form, handleChange, handleSubmit] = useForm({
    username: "",
    email: "",
    password: "",
  });
  // const [form, setForm] = React.useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   // fullName: "",
  // });
  const [error, setError] = React.useState(null);

  // function onSubmit(event) {
  //   event.preventDefault();
  //   AUTH_SERVICE.SIGNUP(form).then((response) => {
  //     if (!response.status) {
  //       setError(response);
  //       return;
  //     }
  //     props.authenticate(response.data.user);
  //     // dear localStorage with JSON. thanks
  //     // dear json localStorage. thanks
  //     // dear json localStorage = thanks(lift State up. and Status as well, why not?)
  //     localStorage.setItem(CONSTS.ACCESS_TOKEN, response.data.accessToken);
  //     // WE NEED TO MAKE SURE THE USER STAYS LOGGED IN. WE DONT HAVE COOKIES, BUT WE CAN USE ANOTHER KIND OF IN-BROWSER MEMORY
  //     props.history.push(PATHS.HOME_PAGE);
  //   });
  //   // .catch((err) => {
  //   //   console.log("response was NOT SUCCESSFUL", err.response); // this is in axios errors
  //   //   if (err?.response?.data?.errorMessage) {
  //   //     setError({
  //   //       message: err.response.data.errorMessage,
  //   //       key: err.response.data.key,
  //   //     });
  //   //   }
  //   // });
  // }

  // function handleChange(event) {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  // }

  const onSubmit = handleSubmit((formValues) => {
    AUTH_SERVICE.SIGNUP(formValues).then((response) => {
      if (!response.status) {
        setError(response);
        return;
      }
      props.authenticate(response.data.user);
      // dear localStorage with JSON. thanks
      // dear json localStorage. thanks
      // dear json localStorage = thanks(lift State up. and Status as well, why not?)
      localStorage.setItem(CONSTS.ACCESS_TOKEN, response.data.accessToken);
      // WE NEED TO MAKE SURE THE USER STAYS LOGGED IN. WE DONT HAVE COOKIES, BUT WE CAN USE ANOTHER KIND OF IN-BROWSER MEMORY
      props.history.push(PATHS.HOME_PAGE);
    });
  });

  return (
    <div>
      <h1>
        S<span style={{ fontSize: ".75rem" }}>I</span>gnup Page
      </h1>
      <form onSubmit={onSubmit}>
        {/* <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            // onChange={event => setUsername(event.target.value)}
            value={form.fullName}
          />

ℹ  DONE  JSON Project bootstrapped successfully.

You can now cd ./new-app


/tmp took 58s
❯
        </div> */}
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            // onChange={event => setUsername(event.target.value)}
            value={form.username}
          />
          {error?.key === "username" && (
            <p className="errorMessage">{error.message}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input name="email" onChange={handleChange} value={form.email} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          {error?.password === "password" && (
            <p className="errorMessage">{error.message}</p>
          )}
        </div>
        <button>Submit</button>
        {/* {error && <p>{error}</p>} */}
        {!error?.key && <p>{error?.message}</p>}
        {/* {error ? <p>{error}</p> : null} */}
        {error?.key === "email" && (
          <p className="errorMessage">{error.message}</p>
        )}
      </form>
    </div>
  );
}

export default SignupPage;
