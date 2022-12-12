import React, { useState } from "react";
import Alarm from "./Alarm";
import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Button from "@mui/material/Button";
import { sendList } from "../fetch";
import { useNavigate } from "react-router-dom";

function Home() {
	const [count, setCount] = useState(1);

	const list: number[] = [];
	const allMedic: string[] = [];

	// init total of list items
	for (let i = 1; i <= count; i++) {
		list.push(i);
		allMedic.push(`medication${i}`);
	}

	// init values hooks\
	const allMedicInit = allMedic.map((e: string) => "");

	// handle click fct
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	const [values, setValues] = useState(allMedicInit);

	console.log(list.length);

	// ----- MAP on input -----
	const element = allMedic.map((e: string, i: number) => (
		<div
			key={i + 1}
			className={
				"w-full m-1 border border-amber-500 rounded-2xl bg-gradient-to-b from-amber-100 to-amber-300 shadow-2xl border-b-4"
			}
		>
			<label htmlFor={e}>
				<input
					name={e}
					type="text"
					placeholder={`Medication${i + 1}`}
					className={"text-center rounded-full"}
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
			</label>

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
		</div>
	));

	const username = window.location.pathname.split("/")[2];
	const navigate = useNavigate();

	return (
		<div className={"container"}>
			{element}

			<Alarm />
			<Button
				onClick={() => {
					// send the list
					delete values[0];
					if (Object.keys(values).length > 0) {
						sendList({ ...values }, username)
							.then((data) => {
								console.log(data);
							})
							.catch((err) => {
								console.error(err);
							});
					} else {
						console.log("No values to send");
					}
				}}
			>
				SEND
			</Button>

			<div>
				<button onClick={() => navigate(`/report/${username}`)}>
					Weekly Report
				</button>
				<button>Ask M.D.</button>
			</div>
		</div>
	);
}

export default Home;
