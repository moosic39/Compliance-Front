import React, { useState } from "react";
import Alarm from "./Alarm";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Button from "@mui/material/Button";
import * as events from "events";
import { sendList } from "../fetch";
import { useNavigate } from "react-router-dom";

function Home() {
  // const [medication, setMedication] = useState(String);

  const [count, setCount] = useState(1);

  const list: number[] = [];
  const allMedic: string[] = [];

  for (let i = 1; i <= count; i++) {
    list.push(i);
    allMedic.push(`medication${i}`);
  }

  const allMedicInit = allMedic.map((e: string) => "");

  const handleInputChange = (e: events) => {
    // const name = e.target.name
    // const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const [values, setValues] = useState(allMedicInit);
  // list = [1, 2, 3, 4, 5];
  console.log(list.length);

  // ----- MAP sur l'input -----
  const element = allMedic.map((e: string, i: number) => (
    <div
      key={i + 1}
      className={"w-full m-2 rounded-2xl border border-blue-500"}
    >
      <label htmlFor={e}>
        <input
          name={e}
          type="text"
          placeholder={`Medication${i + 1}`}
          className={"text-center rounded-full"}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </label>
      {/* PREVIOUS WORKING BUTTON */}
      {/* <button */}
      {/*   onClick={() => { */}
      {/*     if (i + 1 === list.length) { */}
      {/*       setCount(count + 1); */}
      {/*     } else { */}
      {/*       setCount(count - 1); */}
      {/*     } */}
      {/*   }} */}
      {/* > */}
      {/*   <IconButton> */}
      {/*     {i + 1 === list.length ? ( */}
      {/*       <AddCircleRoundedIcon /> */}
      {/*     ) : ( */}
      {/*       <RemoveCircleRoundedIcon /> */}
      {/*     )} */}
      {/*   </IconButton> */}
      {/* </button> */}

      <IconButton
        onClick={() => {
          if (i + 1 === list.length) {
            setCount(count + 1);
          } else {
            setCount(count - 1);
          }
        }}
      >
        {i + 1 === list.length ? (
          <AddCircleRoundedIcon color={"success"} />
        ) : (
          <RemoveCircleRoundedIcon color={"error"} />
        )}
      </IconButton>
    </div>
  ));

  const username = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  return (
    <div className={"container"}>
      {element}

      <Alarm />
      <Button
        onClick={() => {
          // send the list
          delete values[0];
          sendList({ ...values }, username)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        SEND
      </Button>

      <div>
        <button onClick={() => navigate(`/report/${username}`)}>
          Weekly Report
        </button>
        <button>Ask M.D.</button>
      </div>
    </div>
  );
}

export default Home;
