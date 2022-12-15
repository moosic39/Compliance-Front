import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
	return (
		<div>
			<h1>Welcome</h1>
			<h6>to Compliance app</h6>
			<Link to={"/signup"}>
				{" "}
				<Button>{"You don't have an account yet"}</Button>{" "}
			</Link>
			<br />
			<Link to={"/signin"}>
				{" "}
				<Button>{"You already have an account"}</Button>
			</Link>
		</div>
	);
}
