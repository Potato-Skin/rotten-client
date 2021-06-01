import axios from "axios";
import React from "react";
import * as CONSTS from "../utils/consts";

function SingleUserPage(props) {
  console.log("props:", props);
  const [user, setUser] = React.useState({});
  console.log("user:", user);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/users/${props.match.params.username}`)
      .then((getBack) => {
        setUser(getBack.data.user);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  return <div>Dyanmic person over here</div>;
}

export default SingleUserPage;
