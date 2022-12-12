import React from "react";

function MrTea() {
	const [data, setData] = React.useState();

	const promise = fetch(window.location.pathname);
	promise
		.then(async (res) => await res.json())
		.then(async (data) => await setData(data));
	return (
		<div>
			{data}
			<br />
			{"this server don't brew coffee"}
		</div>
	);
}

export default MrTea;
