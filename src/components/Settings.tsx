import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getInfo, putInfo, deleteUser } from "../fetch.js";
import { useNavigate } from "react-router-dom";

function Settings() {
  interface InputProps {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    doctor?: string;
    doctoremail?: string;
  }

  interface Init {
    _id?: string;
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

  const input = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    doctor: "",
    doctoremail: "",
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const username: string = window.location.pathname.split("/")[2];
  React.useEffect(() => {
    getInfo(username)
      .then((infos) => {
        setInit(infos[0]);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);

  const [values, setValues] = useState<InputProps>(input);

  const dbInput: string[] = Object.keys(values);
  const dbInit = dbInput.map((e) => e);
  const [init, setInit] = useState<Init>(dbInit);
  const [sure, setSure] = useState<boolean>(false);
  const navigate = useNavigate();

  delete init._id;
  delete init.__v;
  delete init.hash;
  delete init.token;

  const dbElement = Object.entries(init).map((e, i) => (
    <div key={i}>
      <label htmlFor={e[0]}>
        <TextField
          id="outlined-basic"
          label={e[0]}
          variant="outlined"
          size={"small"}
          className={"center"}
          value={e[1]}
        />
      </label>
    </div>
  ));

  const element = Object.entries(input).map((e, i) => (
    <div key={i}>
      <label htmlFor={e[0]}>
        <TextField
          id="outlined-basic"
          label={e[0]}
          variant="outlined"
          name={e[0]}
          onChange={(poulet) => {
            handleInputChange(poulet);
          }}
          size={"small"}
          className={"center"}
        />
      </label>
    </div>
  ));

  function sendData() {
    putInfo(values, username)
      .then((data) => {
        console.log(data);
        navigate(0);
      })
      .catch((err) => console.log({ err }));
  }

  function del() {
    setTimeout(() => {
      navigate("/");
    }, 1000);

    deleteUser(username)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  return (
    <div>
      <h2>Settings</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "33ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        {dbElement}
      </Box>
      <br />
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "33ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        {element}
      </Box>
      <Button
        variant="contained"
        onClick={sendData}
        endIcon={<SaveIcon />}
        size={"small"}
      >
        Save modifications
      </Button>

      <Button
        variant={"contained"}
        color={"error"}
        size={"small"}
        onClick={() => {
          setSure(true);
        }}
      >
        Delete All
      </Button>
      <div className={sure ? "" : "hidden"}>
        Are you sure? <button onClick={del}>Yes</button>
        <button
          onClick={() => {
            setSure(false);
          }}
        >
          No
        </button>
      </div>
      <div className={sure ? "" : "hidden"}>
        Your historical data won't be deleted <br />
        Unless you ask us for it
      </div>
    </div>
  );
}

export default Settings;
