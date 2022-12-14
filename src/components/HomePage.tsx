import React, { useState } from "react";
import Alarm from "./Alarm";
import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Button from "@mui/material/Button";
import { sendList } from "../fetch";
import { useNavigate } from "react-router-dom";
import SettingsButton from "./SettingsButton";
import HomeButton from "./HomeButton";
import LogoutButton from "./LogoutButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AskMdButton from "./AskMDButton";

function HomePage() {
	const [count, setCount] = useState<number>(1);
	const [isPrompt, setIsPrompt] = useState<boolean>(false);

	const userToken = window.localStorage.getItem("username");
	if (userToken !== null || userToken !== "") {
		window.localStorage.removeItem("username");
	}

	const list: number[] = [];
	const allMedic: string[] = [];

	// init total of list items
	for (let i = 1; i <= count; i++) {
		list.push(i);
		allMedic.push(`medication${i}`);
	}

	// init values hooks
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
		<div className={""}>
			<div className={"rs-flex-box-grid-end"}>
				<LogoutButton />
			</div>
			<div className={"rs-flex-box-grid-space-between"}>
				<HomeButton />
				<SettingsButton />
			</div>

			{element}

			<Alarm />
			<Button
				endIcon={<SendRoundedIcon />}
				onClick={() => {
					// send the list
					delete values[0];
					if (Object.keys(values).length > 0) {
						sendList({ ...values }, username)
							.then((data) => {
								console.log(data.message);
								if (data.status === 201) {
									setIsPrompt(true);
									setTimeout(() => {
										setIsPrompt(false);
									}, 5000);
								}
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

			<div className={"flex"}>
				<button onClick={() => navigate(`/report/${username}`)}>Report</button>
				<div
					className={isPrompt ? "text-emerald-500 font-semibold" : "invisible"}
				>
					Data has been <br /> sent successfully
				</div>
				<AskMdButton />
			</div>
		</div>
	);
}

export default HomePage;
