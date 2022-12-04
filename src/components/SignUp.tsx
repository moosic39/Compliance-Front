import React, { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(Boolean);

  function confirmPassword(event: any) {
    if (event.target.value !== password) {
      console.log("wrong");
      setConfirm(true);
    } else {
      console.log("correct");
      setConfirm(false);
    }
  }

  function isReadyToSubmit() {
    if (email.includes("@") && username !== "") {
      console.log("OK for Submission");
      return true;
    } else {
      console.log("Retry Submission");
      return false;
    }
  }

  function onSubmitHandler(event: any) {
    let message = "";
    event.preventDefault();
    isReadyToSubmit() ? alert("nice") : (message = "not OK");
    console.log("message", message);
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type={"email"}
          placeholder={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"text"}
          placeholder={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={"password"}
          placeholder={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type={"password"}
          placeholder={"confirm password"}
          onChange={confirmPassword}
        />
        <span className={`bg-red-600 text-white ${confirm ? "" : "hidden"}`}>
          Wrong password
        </span>
        <button type={"submit"} disabled={confirm}>
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
