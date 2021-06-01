export const HOME_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const SIGNUP_PAGE = "/signup";
export const PROFILE_PAGE = "/profile";
export const MOVIES_PAGE = "/movies";
export const ADD_MOVIES = `${MOVIES_PAGE}/add`;
export const SINGLE_MOVIE = `${MOVIES_PAGE}/:movieId`;
export const EDIT_MOVIE = `${SINGLE_MOVIE}/edit`;
export const SINGLE_USER = `/:username`;
export const SUPER_IMPORTANT = "/top-secret";
export const MESSAGES = "/messages";

// export default -> module.exports = something // const somethingElse = require("./")
// export const something // import {something} from './' // this is called a named export
