import React, { useState } from "react";
import SetAlarm from "./setAlarm";

function Alarm() {
  function renderTime() {
    const [date, time] = new Date().toLocaleString("fr-FR").split(" ");
    const [hours, minutes, secondes] = time.split(":");
    return `${hours}:${minutes}`;
  }

  const [alarm, setAlarm] = useState("");

  // Clock
  setInterval(() => {
    const currentTime = renderTime().toString();
    if (alarm === currentTime) {
      console.log("play sound & notification");
    }
  }, 1000);

  return (
    <div>
      <div>
        <SetAlarm alarm={alarm} />
        <input
          type="time"
          className={"text-sky-500 font-extrabold text-7xl"}
          onChange={(e) => setAlarm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Alarm;
