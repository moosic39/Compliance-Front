import React, { useEffect, useState } from "react";

import bip from "../assets/mixkit-melodical-flute-music-notification-2310.wav";
import Notification from "./Notification";

const sound = new Audio(bip);

interface isNotifProps {
  isNotif: boolean;
}

function Alarm() {
  function renderTime() {
    const [date, time] = new Date().toLocaleString("fr-FR").split(" ");
    const [hours, minutes, secondes] = time.split(":");
    return `${hours}:${minutes}`;
  }

  const [alarm, setAlarm] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isNotif, setIsNotif] = useState<boolean>(false);

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
    setIsNotif(false);
    // openNotif = false;
  }

  // Clock
  useEffect(() => {
    console.log(isActive, alarm);
    const hasAlarm = alarm !== "";
    if (!hasAlarm || !isActive) {
      return;
    }

    const idInterval = setInterval(async () => {
      const currentTime = renderTime().toString();
      console.log("miou?");
      // Alarm
      if (alarm === currentTime) {
        await sound.play();
        console.log("play sound & notification");
        setIsNotif(true);
        // setIsActive(false);
      }
    }, 1000);

    return () => clearInterval(idInterval);
  }, [alarm, isActive]);

  return (
    <div>
      <div>
        <input
          id={"time"}
          type="time"
          className={"text-sky-500 font-extrabold text-7xl"}
          onChange={(e) => setAlarm(e.target.value)}
        />
      </div>
      <button onClick={toggleAlarm}>{isActive ? "Stop" : "Start"}</button>
      <Notification isNotif={isNotif} />
    </div>
  );
}

export default Alarm;
