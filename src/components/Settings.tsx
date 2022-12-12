import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getInfo } from "../fetch";

function Settings() {
	// interface Tot {
	// 	firstName: string;
	// 	lastName: string;
	// 	email: string;
	// 	password: string;
	// 	doctor: string;
	// 	doctorEmail: string;
	// }

	const tot = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		doctor: "",
		doctorEmail: "",
	};

	const allInput: string[] = Object.keys(tot);
	const allInputInit = allInput.map((e: string) => "");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	const username: string = window.location.pathname.split("/")[2];
	React.useEffect(() => {
		getInfo(username)
			.then((infos) => {
				console.log(infos);
				setValues(infos);
			})
			.catch((err) => {
				console.error({ err });
			});
	}, []);

	const [values, setValues] = useState(allInputInit);
	console.log(values);

	const element = allInput.map((e, i) => (
		<div key={i}>
			<label htmlFor={e}>
				{" "}
				<TextField
					id="outlined-basic"
					label={e}
					variant="outlined"
					onChange={(e) => {
						handleInputChange(e);
					}}
					className={"center"}
				/>
			</label>
		</div>
	));

	return (
		<div>
			<h2>Settings</h2>

			<Box
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "33ch" },
				}}
				noValidate
				autoComplete="off"
			>
				{element}
			</Box>
			<Button variant="contained" endIcon={<SaveIcon />}>
				Save modifications
			</Button>
		</div>
	);
}

export default Settings;
