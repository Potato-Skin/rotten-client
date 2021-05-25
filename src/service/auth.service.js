import axios from "axios";
import * as CONSTS from "../utils/consts";

const authService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/auth`,
});

function dealSuccess(response) {
  return {
    status: true,
    data: response.data,
  };
}

function dealError(err) {
  console.log("err:", err.response);
  return {
    status: false,
    message: err?.response?.data?.errorMessage,
    key: err?.response?.data?.key,
  };
}

export function SIGNUP(body) {
  return authService.post("/signup", body).then(dealSuccess).catch(dealError);
}

export function LOGIN(body) {
  return authService.post("/login", body);
}

export function LOGOUT(token) {
  return authService.delete("/logout", {
    headers: {
      authorization: token,
    },
  });
}

export function GET_ME(token) {
  return authService.get("/me", {
    headers: {
      authorization: token,
    },
  });
}
