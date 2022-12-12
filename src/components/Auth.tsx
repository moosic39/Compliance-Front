import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { signin } from "../fetch";
import { useNavigate } from "react-router-dom";

function Auth() {
	interface State {
		username: string;
		password: string;
		showPassword: boolean;
	}

	const [values, setValues] = React.useState<State>({
		username: "",
		password: "",
		showPassword: false,
	});

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({
				...values,
				[prop]: event.target.value,
			});
		};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const navigate = useNavigate();
	const onSubmitHandler: any = (event: HTMLFormElement) => {
		event.preventDefault();
		console.log(values.username, values.password);
		signin(values.username, values.password)
			.then((data) => {
				console.log(data.token);
				if (data.username) {
					window.localStorage.setItem("token", data.token);
					navigate(`/user/${data.username}`);
				}
			})
			.catch((err) => console.log({ err }));
	};

	return (
		<div>
			<div>
				<h1>Coucou</h1>
			</div>
			<form onSubmit={onSubmitHandler}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<FormControl
						sx={{
							m: 1,
							width: "25ch",
						}}
					>
						<InputLabel htmlFor={"username"}>Username</InputLabel>
						<Input
							id="username"
							value={values.username}
							onChange={handleChange("username")}
							endAdornment={
								<InputAdornment position={"end"}>
									<AccountCircle
										sx={{
											color: "action.active",
											mr: 1,
											my: 0.5,
										}}
									/>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<div>
						<FormControl
							sx={{
								m: 1,
								width: "25ch",
							}}
							variant="standard"
						>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								id="password"
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</div>
				</Box>
				<Button variant={"contained"} type={"submit"}>
					Log In
				</Button>
			</form>
		</div>
	);
}

export default Auth;
