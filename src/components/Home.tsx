import React, { useState } from "react";
import Alarm from "./Alarm";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

function Home() {
  // const [medication, setMedication] = useState(String);

  const [count, setCount] = useState(1);

  const list: number[] = [];
  const allMedic: string[] = [];

  for (let i = 1; i <= count; i++) {
    list.push(i);
    allMedic.push(`medication${i}`);
  }

  const allMedicInit = allMedic.map((e) => ({ e: "" }));
  const handleInputChange = (e: any) => {
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
    <div key={i + 1} className={"w-full m-2 border border-blue-500"}>
      <label htmlFor={e}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          onChange={() => {
            console.log(e, Object.values(values)[i + 1]);
          }}
          id={e}
        />
        <input
          name={e}
          type="text"
          placeholder={`Medication${i + 1}`}
          className={"text-center"}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        {/* PREVIOUS WORKING BUTTON */}
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
      </label>
    </div>
  ));

  // --------------------------
  function fct(event: any) {
    console.log(values);
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
