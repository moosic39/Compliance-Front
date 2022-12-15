import "./App.css";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";

import Auth from "./components/Auth";
import Report from "./components/Report";
import NotFound from "./components/NotFound";
// import MrTea from "./components/MrTea";
import NotAllowed from "./components/NotAllowed";
import PrivateRoutes from "./components/PrivatesRoutes";
import SettingsPage from "./components/SettingsPage";
import Welcome from "./components/Welcome";
import LogginSuccessfull from "./components/LogginSuccessfull";

function App() {
	return (
		<div className="App p-20 h-full rounded-xl bg-gradient-to-t from-sky-50 to-sky-200 dark:bg-gradient-to-b dark:from-sky-900 dark:to-sky-700}">
			<div className={"card"}>
				<h2 className="font-bold underline text-stone-700 dark:text-stone-300">
					Compliance
				</h2>
			</div>

			<Routes>
				<Route path={"/"} element={<Welcome />} />
				<Route element={<PrivateRoutes />}>
					<Route path={"/loggin-successfull"} element={<LogginSuccessfull />} />
					<Route path={"/user/:id"} element={<HomePage />} />
					<Route path={"/report/:id"} element={<Report />} />
					<Route path={"/settings/:id"} element={<SettingsPage />} />
				</Route>
				<Route path={"/signup"} element={<SignUp />} />
				<Route path={"/signin"} element={<Auth />} />

				{/* <Route path={"/users"} element={<MrTea />} /> */}
				<Route path={"/403"} element={<NotAllowed />} />
				<Route path={"/*"} element={<NotFound />} />
			</Routes>
			<div className="card"></div>
			<footer>
				<p className="read-the-docs text-xs">© 2022 Mickael JEGAT</p>
			</footer>
		</div>
	);
}

export default App;
