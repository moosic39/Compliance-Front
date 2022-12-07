import React, { useState } from "react";
import Alarm from "./Alarm";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { red } from "@mui/material/colors";

function Home() {
  const [medication, setMedication] = useState(String);
  const [count, setCount] = useState(1);
  const list: number[] = [];
  for (let i = 1; i <= count; i++) {
    list.push(Number(i));
  }

  // list = [1, 2, 3, 4, 5];

  console.log(list);

  // ----- MAP sur l'input -----
  const element = list.map((e: number) => (
    <div key={e} className={"w-full m-2 border border-blue-500"}>
      <label htmlFor={`medication${e}`}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          onChange={fct}
          id={`medication${e}`}
        />
        <input
          type="text"
          placeholder={`Medication${e}`}
          className={"text-center"}
          onChange={(e) => {
            setMedication(e.target.value);
          }}
        />
        {/* <button */}
        {/*   onClick={() => { */}
        {/*     if (e === list.length) { */}
        {/*       setCount(count + 1); */}
        {/*     } else { */}
        {/*       setCount(count - 1); */}
        {/*     } */}
        {/*   }} */}
        {/* > */}
        {/*   {e === list.length ? ( */}
        {/*     <IconButton> */}
        {/*       <AddCircleRoundedIcon /> */}
        {/*     </IconButton> */}
        {/*   ) : ( */}
        {/*     <IconButton> */}
        {/*       <RemoveCircleRoundedIcon /> */}
        {/*     </IconButton> */}
        {/*   )} */}
        {/* </button> */}

        <IconButton
          onClick={() => {
            if (e === list.length) {
              setCount(count + 1);
            } else {
              setCount(count - 1);
            }
          }}
        >
          {e === list.length ? (
            <AddCircleRoundedIcon color={"success"} />
          ) : (
            <RemoveCircleRoundedIcon color={"error"} />
          )}
        </IconButton>
      </label>
    </div>
  ));

  // --------------------------
  function fct(event: any) {
    console.log(medication);
  }

  return (
    <div className={"container"}>
      {element}

      <Alarm />

      <div>
        <button>Weekly Report</button>
        <button>Ask M.D.</button>
      </div>
    </div>
  );
}

export default Home;
