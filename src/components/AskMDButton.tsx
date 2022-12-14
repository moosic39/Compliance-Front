import React, { useState } from "react";
import { getInfo } from "../fetch";

function AskMdButton() {
  interface Init {
    id?: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    hash?: string;
    token?: string;
    doctor: string;
    doctoremail: string;
    __v?: string;
  }

  const [init, setInit] = useState<Init>();
  const username: string = window.location.pathname.split("/")[2];
  const [isPrompt, setIsPrompt] = useState<boolean>(false);

  React.useEffect(() => {
    getInfo(username)
      .then((infos) => {
        setInit(infos[0]);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);
  console.log(init);

  function ask() {
    if (init.doctoremail !== undefined && init.doctoremail !== "") {
      console.log(init.doctoremail);
      window.location = `mailto:${init.doctoremail}`;
    } else {
      setIsPrompt(true);
      setTimeout(() => setIsPrompt(false), 3000);
    }
  }

  return (
    <div>
      <button onClick={ask}>Ask M.D.</button>
      <br />
      <span className={isPrompt ? "" : "hidden relative"}>
        please register
        <br /> a doctor before
      </span>
    </div>
  );
}

export default AskMdButton;
