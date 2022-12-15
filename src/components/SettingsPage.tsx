import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getInfo, putInfo, deleteUser } from "../fetch.js";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function SettingsPage() {
	interface InputProps {
		firstname?: string;
		lastname?: string;
		email?: string;
		password?: string;
		doctor?: string;
		doctoremail?: string;
	}

	interface Init {
		_id?: string;
		username: string;
		firstname: string;
		lastname: string;
		email: string;
		hash?: string;
		token?: string;
		doctor: string;
		doctoremail: string;
		__v?: string;
	}

	const input = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		doctor: "",
		doctoremail: "",
	};

	const handleInputChange = (e: any) => {
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
				setInit(infos[0]);
			})
			.catch((err) => {
				console.error({ err });
			});
	}, []);

	const [values, setValues] = useState<InputProps>(input);

	const dbInput: string[] = Object.keys(values);
	const dbInit = dbInput.map((e) => e);
	const [init, setInit] = useState<Init>(dbInit);
	const [sure, setSure] = useState<boolean>(false);
	const navigate = useNavigate();
	const [isReady, setIsReady] = useState<boolean>(false);

	delete init._id;
	delete init.__v;
	delete init.hash;
	delete init.token;

	const dbElement = Object.entries(init).map((e, i) => (
		<div key={i}>
			<label htmlFor={e[0]}>
				<TextField
					id="outlined-basic"
					label={e[0]}
					variant="outlined"
					size={"small"}
					className={"center"}
					value={e[1]}
				/>
			</label>
		</div>
	));

	const element = Object.entries(input).map((e, i) => (
		<div key={i}>
			<label htmlFor={e[0]}>
				<TextField
					id="outlined-basic"
					label={e[0]}
					variant="outlined"
					name={e[0]}
					onChange={(poulet) => {
						handleInputChange(poulet);
					}}
					size={"small"}
					className={"center"}
				/>
			</label>
		</div>
	));

	function sendData() {
		if (values.password === "") {
			setIsReady(true);
			setTimeout(() => {
				setIsReady(false);
			}, 3000);
		} else {
			setIsReady(false);
			putInfo(values, username)
				.then((data) => {
					console.log(data);
					navigate(0);
				})
				.catch((err) => console.log({ err }));
		}
	}

	function del() {
		setTimeout(() => {
			navigate("/");
		}, 1000);

		deleteUser(username)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.error({ err });
			});
	}

	return (
		<div>
			<HomeButton />

			<h2>Settings</h2>
			<table>
				<tbody>
					<tr>
						<td>
							<Box
								component="form"
								sx={{
									"& > :not(style)": {
										m: 1,
										width: "25ch",
									},
								}}
								noValidate
								autoComplete="off"
							>
								{dbElement}
							</Box>
						</td>
						<td>
							<Box
								component="form"
								sx={{
									"& > :not(style)": {
										m: 1,
										width: "25ch",
									},
								}}
								noValidate
								autoComplete="off"
							>
								{element}
							</Box>
						</td>
					</tr>
				</tbody>
			</table>
			<Button
				variant="contained"
				onClick={sendData}
				endIcon={<SaveIcon />}
				size={"small"}
			>
				Save
			</Button>
			<span className="px-2"></span>
			<Button
				variant={"contained"}
				color={"error"}
				size={"small"}
				onClick={() => {
					setSure(true);
				}}
				endIcon={<DeleteForeverRoundedIcon />}
			>
				Delete
			</Button>
			<div className={!isReady ? "invisible" : "text-red-600"}>
				Enter your password
			</div>
			<div className={sure ? "" : "invisible"}>
				Are you sure? <button onClick={del}>Yes</button>
				<button
					onClick={() => {
						setSure(false);
					}}
				>
					No
				</button>
			</div>
			<div className={sure ? "" : "invisible"}>
				Your medications data won&#39;t be deleted <br />
				Unless you ask us for it
				<Button
					onClick={() => (window.location = "mailto:mickael.jegat@gmail.com")}
				>
					Contact Me
				</Button>
			</div>
		</div>
	);
}

export default SettingsPage;
