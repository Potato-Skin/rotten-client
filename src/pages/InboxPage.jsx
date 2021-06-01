import axios from "axios";
import React, { useState } from "react";
import useForm from "../hooks/useForm";
import * as CONSTS from "../utils/consts";

const fakeUserId = "60a40249b79eaa7124236b3d";

function InboxPage() {
  const [conversations, setConversations] = useState([]);

  const [form, handleChange, handleSubmit] = useForm({
    text: "",
  });
  console.log("form:", form);
  React.useEffect(() => {
    const myAccessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!myAccessToken) {
      return;
    }
    axios
      .get(`${CONSTS.SERVER_URL}/conversations`, {
        headers: { authorization: myAccessToken },
      })
      .then((response) => {
        console.log("response:", response);
        setConversations(response.data);
      });
  }, []);

  function onSubmit(formValues) {
    const myAccessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .post(
        `${CONSTS.SERVER_URL}/conversations/new-message`,
        {
          ...formValues,
          other: fakeUserId,
        },
        {
          headers: {
            authorization: myAccessToken,
          },
        }
      )
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return (
    <div>
      INBOX PAGE
      <div>
        <h2>Send a message to a witcher</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="text"
            type="text"
            value={form.text}
            onChange={handleChange}
          />
          <button type="submit">Send text</button>
        </form>
      </div>
    </div>
  );
}

export default InboxPage;
