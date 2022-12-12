import React from "react";

function MrTea() {
	const promise = fetch(window.location.pathname);
	promise.then(async (res) => await res.json());

	return <div>this server don&quott brew coffee </div>;
}

export default MrTea;
