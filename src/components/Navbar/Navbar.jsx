import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { UserContext } from "../../context/User.context";

function Navbar(props) {
  const { user, logout } = React.useContext(UserContext);

  const unReadMessages = props.conversations.reduce((acc, val) => {
    if (!user) {
      return [];
    }

    if (user._id.toString() === val.user1.toString()) {
      if (!val.user2Read) {
        return [...acc, val];
      }
    }

    if (user._id.toString() === val.user2.toString()) {
      if (!val.user2Read) {
        return [...acc, val];
      }
    }

    return acc;
  }, []);

  console.log("unReadMessages:", unReadMessages);
  return (
    <nav>
      <Link to={PATHS.HOME_PAGE}>Home</Link>
      <Link to={PATHS.MOVIES_PAGE}>Movies</Link>

      {user ? (
        <div>
          <div>Hey {user.username}</div>
          <div>
            <Link to={PATHS.PROFILE_PAGE}>Profile</Link>
          </div>
          <div onClick={logout}>Logout</div>
        </div>
      ) : (
        <>
          <Link to={PATHS.SIGNUP_PAGE}>Signup</Link>
          <Link to={PATHS.LOGIN_PAGE}>Login</Link>
        </>
      )}
      {unReadMessages.length && (
        <div>You have mail. {unReadMessages.length}</div>
      )}
      {/* {!props.user && <Link to={PATHS.SIGNUP_PAGE}>Signup</Link>}
      {props.user ? null : <Link to={PATHS.LOGIN_PAGE}>Login</Link>}

      {props.user ? <div>Hey {props.user.username}</div> : null}
      {props.user ? <div onClick={props.logout}>Logout</div> : null} */}
    </nav>
  );
}

export default Navbar;
