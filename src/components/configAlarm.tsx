import React from "react";

function ConfigAlarm() {
  function startAlarm() {
    console.log("start");
  }

  function stopAlarm() {
    console.log("stop");
  }

  return (
    <div>
      <button onClick={startAlarm}>Start</button>
      <button onClick={stopAlarm}>Stop</button>
    </div>
  );
}

export default ConfigAlarm;
