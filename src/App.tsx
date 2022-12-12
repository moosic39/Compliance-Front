import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import Auth from "./components/Auth";
import Report from "./components/Report";
import NotFound from "./components/NotFound";
// import MrTea from "./components/MrTea";
import NotAllowed from "./components/NotAllowed";
import PrivateRoutes from "./components/PrivatesRoutes";
import Settings from "./components/Settings";
import Welcome from "./components/Welcome";

function App() {
	return (
		<div className="App p-20 h-full rounded-xl w-full bg-gradient-to-t from-sky-50 to-sky-200 dark:bg-gradient-to-b dark:from-sky-900 dark:to-sky-700}">
			<div className={"card"}>
				<h2 className="font-bold underline">Compliance</h2>
			</div>

			<Routes>
				<Route path={"/"} element={<Welcome />} />
				<Route element={<PrivateRoutes />}>
					<Route path={"/user/:id"} element={<Home />} />
					<Route path={"/report/:id"} element={<Report />} />
					<Route path={"/settings/:id"} element={<Settings />} />
				</Route>
				<Route path={"/signup"} element={<SignUp />} />
				<Route path={"/signin"} element={<Auth />} />
				<Route path={"/test"} element={<Test />} />
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
