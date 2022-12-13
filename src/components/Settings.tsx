import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getInfo, putInfo } from "../fetch.js";

function Settings() {
  interface InputProps {
    // username: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    doctor?: string;
    doctoremail?: string;
  }

  interface Init {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    hash: string;
    token: string;
    doctor: string;
    doctoremail: string;
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

  // const allInput: string[] = Object.keys(input);
  // const allInputInit = allInput.map(() => "");
  const [values, setValues] = useState<InputProps>(input);

  const dbInput: string[] = Object.keys(values);
  const dbInit = dbInput.map((e) => e);
  const [init, setInit] = useState<Init>(dbInit);

  // console.log("db", init);
  // console.log("val", values);

  // const element = Object.entries(values).map((e, i) => (
  //   <div key={i}>
  //     <label htmlFor={e[1]}>
  //       <TextField
  //         id="outlined-basic"
  //         label={e[0]}
  //         variant="outlined"
  //         onChange={(poulet) => {
  //           handleInputChange(poulet);
  //         }}
  //         defaultValue={e[1]}
  //         size={"small"}
  //         className={"center"}
  //       />
  //     </label>
  //   </div>
  // ));

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
    // let values[_id]='';
    // console.log(init._id, { ...values });
    // setValues({ ...values }, ([_id] = init._id));
    // Object.defineProperty(values, "username", {
    //   value: init.username,
    //   writable: true,
    // });

    putInfo(values, username)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log({ err }));
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
        onClick={
          sendData
          //   () => {
          //   console.log(values);
          //
          //   // if (Object.values(values)) {
          //   //   const toSend = [Object.keys(values), Object.values(values)];
          //   //   console.log({ ...toSend });
          //   // }
          //   // putInfo({ ...values }, username)
          //   //   .then((data) => {
          //   //     console.log(data);
          //   //   })
          //   //   .catch((error) => console.error(error));
          // }
        }
        endIcon={<SaveIcon />}
        size={"small"}
      >
        Save modifications
      </Button>
      <Button variant={"contained"} color={"error"} size={"small"}>
        Delete All
      </Button>
    </div>
  );
}

export default Settings;
