import {
	CircularProgress,
	Table,
	TableBody,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { getAll } from "../fetch";

interface Medications {
	medication1: string;
	medication2: string;
	medication3: string;
	medication4: string;
	medication5: string;
	medication6: string;
	medication7: string;
	medication8: string;
	medication9: string;
	medication10: string;
	medication11: string;
	medication12: string;
	medication13: string;
	medication14: string;
	medication15: string;
}

interface ApiComponent {
	medications: Medications;
	timestamp: number;
	username: string;
	_id: string;
}

interface ErrorType {
	message: string;
}

function Report() {
	const username = window.location.pathname.split("/")[2];
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorType>({
		message: "",
	});

	React.useEffect(() => {
		setTimeout(() => {
			getAll(username)
				.then((data) => {
					console.log(data);
					setData(data);
				})
				.catch((err: ErrorType) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}, 1000);
	}, []);

	function convertTimestamps(timestamp: number) {
		const e = new Date(timestamp);
		const hour = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
		const minute = e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();
		const date = e.getDate() < 10 ? `0${e.getDate()}` : e.getDate();
		const month = e.getMonth() < 10 ? `0${e.getMonth()}` : e.getMonth();
		const year = e.getFullYear();
		return `${date}/${month}/${year} ${hour}:${minute}`;
	}

	if (error.message !== "") {
		console.log(error.message);
	}

	// Delta a conserver pour faire une semaine
	const now = Date.now();
	console.log(now);
	console.log(now - 604799000);
	console.log(convertTimestamps(now));
	console.log(convertTimestamps(now - 604799000));

	return (
		<div>
			<div className={"card"}>Report</div>
			<div>
				<Table className={"table table-fixed inline-table border border-black"}>
					<TableHead>
						<TableRow className="border border-black">
							<td>Username</td>
							<td>Date</td>
							<td>Medications</td>
						</TableRow>
					</TableHead>

					<TableBody>
						{data.length > 0 &&
							data.map((ele: ApiComponent, i: number) => {
								return (
									<tr key={i}>
										<td>{ele.username}</td>
										<td>{convertTimestamps(ele.timestamp)}</td>
										<td>
											<ul>{ele.medications.medication1}</ul>
											<ul>{ele.medications.medication2}</ul>
											<ul>{ele.medications.medication3}</ul>
											<ul>{ele.medications.medication4}</ul>
											<ul>{ele.medications.medication5}</ul>
											<ul>{ele.medications.medication6}</ul>
											<ul>{ele.medications.medication7}</ul>
											<ul>{ele.medications.medication8}</ul>
											<ul>{ele.medications.medication9}</ul>
											<ul>{ele.medications.medication10}</ul>
											<ul>{ele.medications.medication11}</ul>
											<ul>{ele.medications.medication12}</ul>
											<ul>{ele.medications.medication13}</ul>
											<ul>{ele.medications.medication14}</ul>
											<ul>{ele.medications.medication15}</ul>
										</td>
									</tr>
								);
							})}
					</TableBody>
				</Table>
				<div>{loading ? <CircularProgress /> : null}</div>
			</div>
		</div>
	);
}

export default Report;
