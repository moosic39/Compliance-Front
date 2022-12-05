import React, { useState } from "react";
import Alarm from "./Alarm";

function Home() {
  const [medication, setMedication] = useState(String);
  const [count, setCount] = useState(1);
  const list: any[] = [];
  for (let i = 1; i <= count; i++) {
    list.push(Number(i));
  }
  // list = [1, 2, 3, 4, 5];

  console.log(list);

  // ----- MAP sur l'input -----
  const element = list.map((e: number, i) => (
    <div key={e} className={"w-full m-2 border border-blue-500"}>
      <label htmlFor={`medication${e}`}>
        <input
          type="checkbox"
          id={`medication${e}`}
          className={"accent-sky-400 outline-sky-600"}
          onChange={fct}
        />{" "}
        <input
          type="text"
          placeholder={`Medication${e}`}
          className={"text-center"}
          onChange={(e) => {
            setMedication(e.target.value);
          }}
        />
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

      <div>
        <button>Set Alarm</button>
        <button>Remove all</button>
      </div>
      <Alarm />
      <div>
        <input type="number" min={0} max={24} placeholder={"HH"} />
        {":"}
        <input type="number" min={0} max={59} placeholder={"MM"} />
      </div>
      <div>
        <input
          type="number"
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
          defaultValue={"1"}
          min={"1"}
          max={"10"}
          placeholder={"N"}
        />

        <button>Weekly Report</button>
        <button>Ask M.D.</button>
      </div>
    </div>
  );
}

export default Home;
