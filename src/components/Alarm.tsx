import React, { useEffect, useState } from "react";

import bip from "../assets/mixkit-melodical-flute-music-notification-2310.wav";
import Notification from "./Notification";

const sound = new Audio(bip);

function Alarm() {
  function renderTime() {
    const [date, time] = new Date().toLocaleString("fr-FR").split(" ");
    const [hours, minutes, secondes] = time.split(":");
    return `${hours}:${minutes}`;
  }

  const [alarm, setAlarm] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  // let openNotif: boolean;

  function toggleAlarm() {
    if (!isActive) {
      startAlarm();
    }
    if (isActive) {
      stopAlarm();
    }
  }

  function startAlarm() {
    console.log("start");
    console.log("alarm", alarm);
    setIsActive(true);
  }

  function stopAlarm() {
    sound.pause();
    setAlarm("");
    console.log("stop");
    setIsActive(false);
    // openNotif = false;
  }

  // Clock
  useEffect(() => {
    setInterval(async () => {
      const currentTime = renderTime().toString();
      // console.log("time", currentTime);
      // console.log("alarm", alarm);

      // Alarm
      if (isActive) {
        if (alarm === currentTime) {
          await sound.play();
          console.log("play sound & notification");
          setIsActive(false);
          // openNotif = true;
        }
      }
    }, 1000);
  }, []);

  console.log(isActive);
  return (
    <div>
      <Notification />
      <div>
        <input
          type="time"
          className={"text-sky-500 font-extrabold text-7xl"}
          onChange={(e) => setAlarm(e.target.value)}
        />
      </div>
      <button onClick={toggleAlarm}>{isActive ? "Stop" : "Start"}</button>
    </div>
  );
}

export default Alarm;
