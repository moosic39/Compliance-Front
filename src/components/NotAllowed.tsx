import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotAllowed() {
	const navigate = useNavigate();
	setTimeout(() => {
		navigate("/signin");
	}, 5000);
	return (
		<div>
			403 error: You are not allowed <br />
			you are redirect to signin page
		</div>
	);
}
