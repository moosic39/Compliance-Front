import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogginSuccessfull() {
	const [username, setUsername] = useState<string>();

	async function getLocale() {
		if (window.localStorage.getItem("username") !== undefined) {
			return window.localStorage.getItem("username");
		}
	}

	// async function removeLocale() {
	// 	await window.localStorage.removeItem("username");
	// }

	const local = getLocale();
	local
		.then((data) => {
			setUsername(data);
		})
		.catch((err) => console.log({ err }));

	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate(`/user/${username}`);
			// removeLocale()
			//   .then(() => {
			//     console.log("cool");
			//   })
			//   .catch((err) => console.log({ err }));
		}, 3500);
	}, [username]);

	return (
		<div>
			🎊 Welcome
			<span
				className={
					"px-1 rounded-2xl bg-gradient-to-l from-red-300 to-blue-300 text-stone-600 font-semibold"
				}
			>
				{username?.toUpperCase()}
			</span>
			🎉
			<br /> to this beautiful app
		</div>
	);
}

export default LogginSuccessfull;
