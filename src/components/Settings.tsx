import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getInfo, putInfo } from "../fetch.js";

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
				setValues(infos[0]);
				console.log(values);
			})
			.catch((err) => {
				console.error({ err });
			});
	}, []);

	const allInput: string[] = Object.keys(tot);
	const allInputInit = allInput.map((e: string) => "");
	const [values, setValues] = useState(allInputInit);
	console.log(values);

	const element = Object.entries(values).map((e, i) => (
		<div key={i}>
			<label htmlFor={e[1]}>
				<TextField
					id="outlined-basic"
					label={e[0]}
					variant="outlined"
					onChange={(e) => {
						handleInputChange(e);
					}}
					defaultValue={e[1]}
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
					"& > :not(style)": {
						m: 1,
						width: "33ch",
					},
				}}
				noValidate
				autoComplete="off"
			>
				{element}
			</Box>
			<Button
				variant="contained"
				onClick={() => {
					putInfo({ ...values }, username)
						.then((data) => {
							console.log(data);
						})
						.catch((error) => console.error(error));
				}}
				endIcon={<SaveIcon />}
			>
				Save modifications
			</Button>
		</div>
	);
}

export default Settings;
