import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
	const auth = { token: false };

	localStorage.getItem("token") ? (auth.token = true) : (auth.token = false);

	return auth.token ? <Outlet /> : <Navigate to="/403" />;
}

export default PrivateRoutes;
