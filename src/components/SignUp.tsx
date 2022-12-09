import React, { useState } from "react";
import { signup } from "../fetch";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [isPrompt, setIsPrompt] = useState(false);

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

  function onSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    isReadyToSubmit();
    signup(email, username, password)
      .then((data) => {
        if (data.err !== undefined) {
          // TODO prompt on screen
          if (data.err.code === 11000) {
            console.error(data.err.keyValue.username, "already registered");
            setIsPrompt(true);
            return;
          }
          setIsPrompt(false);
        }
        setIsPrompt(false);
        console.log(data);
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  return (
    <div className={"justify-center"}>
      <form onSubmit={onSubmitHandler}>
        <input
          type={"email"}
          placeholder={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type={"text"}
          placeholder={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className={isPrompt ? "" : "hidden"}> already registered</span>
        <br />

        <input
          type={"password"}
          placeholder={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type={"password"}
          placeholder={"confirm password"}
          onChange={confirmPassword}
        />
        <span className={`bg-red-600 text-white ${confirm ? "" : "hidden"}`}>
          Wrong password
        </span>
        <br />
        <button type={"submit"} disabled={confirm}>
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
