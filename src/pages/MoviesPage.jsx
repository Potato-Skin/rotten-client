import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
// class MoviesPage extends React.Component {
//   state = {
//     counter: 1,
//     name: "Andre",
//     loading: false,
//   };

//   componentDidMount = () => {
//     console.log("WE CAN RUN SOME CODE HRE, COMPONENT WAS `mounted`");
//     axios.get("http://localhost:5000/api/movies").then((response) => {
//       console.log("response:", response);
//     });
//   };

//   componentDidUpdate = () => {
//     console.log(
//       `WE HAVENT SEEN THIS YET, BUT EVERYTIME COMPONENT UPDATES, THIS METHOD GETS CALLED`
//     );
//   };

//   componentWillUnmount = () => {
//     console.log(`Bye bye eeh`);
//   };

//   increment = () => {
//     this.setState({ counter: this.state.counter + 1 });
//   };

//   render() {
//     return (
//       <div>
//         <h1>COUNTER: {this.state.counter}</h1>
//         <button onClick={this.increment}>ADD</button>
//       </div>
//     );
//   }
// }

// WRITE TIME
// Mounting a component -> ONCE
// UPDATING A COMPONENT -> ? amount of times
// UNMOUNTING A COMPONENT -> ONCE

// FUNCTIONAL WAY
function MoviesPage() {
  const [listOfMovies, setListOfMovies] = React.useState([]);
  //   const [counter, setCounter] = React.useState(1);

  React.useEffect(() => {
    console.log("WE CAN RUN SOME CODE HERE, COMPONENT WAS `mounted`");
    // WHEN THE COMPONENTS, we will do an API call to get data that, at WRITE time, we dont have access to
    axios
      .get(`http://localhost:5000/api/movies`)
      .then((response) => {
        console.log("response:", response);
        setListOfMovies(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => console.log("Bye bye eeh");
  }, []); // is the equivalent of componentDidMount

  //   React.useEffect(() => {
  //      console.log("COUNTER UPDATED")
  //   }, [counter, listOfMovies])

  return (
    <div>
      {listOfMovies.map((movie) => {
        return (
          <section key={movie._id}>
            <Link to={`${PATHS.MOVIES_PAGE}/${movie._id}`}>
              <h2>{movie.title}</h2>
              <img
                src={movie.coverPic}
                style={{ width: "300px" }}
                alt="Rum ham"
              />
            </Link>
          </section>
        );
      })}
    </div>
  );
}

export default MoviesPage;
