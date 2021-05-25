import axios from "axios";
import * as CONSTS from "../utils/consts";

const movieService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/movies`,
});

export function ADD_MOVIE(body, token) {
  return movieService.post("/add", body, {
    headers: {
      authorization: token,
    },
  });
}
