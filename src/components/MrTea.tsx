import React from "react";

function MrTea() {
  const promise = fetch(window.location.pathname);
  promise.then(async (res) => await res.json());

  return <div>{}</div>;
}

export default MrTea;
