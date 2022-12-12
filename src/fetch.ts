const PATH = "http://127.0.0.1:3000";

function isAuth(): HeadersInit | undefined {
	const token = window.localStorage.getItem("token");
	const headers: {
		"Content-Type": string;
		token?: string | undefined;
	} = {
		"Content-Type": "application/json; charset=UTF-8",
		token: "",
	};
	if (token !== undefined) {
		headers.token = token;
	} else {
		delete headers.token;
	}
	return headers;
}

// -------------------- USERS ----------------------------

export async function signin(username: string, password: string) {
	const promise = fetch(PATH + "/users/signin", {
		method: "POST",
		headers: isAuth(),
		body: JSON.stringify({
			username,
			password,
		}),
	});
	return await promise.then(async (response) => await response.json());
}

export async function signup(
	email: string,
	username: string,
	password: string
) {
	const promise = fetch(PATH + "/users/signup", {
		method: "POST",
		headers: isAuth(),
		body: JSON.stringify({
			email,
			username,
			password,
		}),
	});
	return await promise.then(async (response) => await response.json());
}

//  -------------------- LISTS ----------------------------
export async function sendList({ ...lists }, username: string) {
	const promise = fetch(`${PATH}/lists/${username}`, {
		method: "POST",
		headers: isAuth(),
		body: JSON.stringify({ ...lists }),
	});
	return await promise.then(async (res) => await res.json());
}

export async function getAll(username: string) {
	const promise = fetch(`${PATH}/lists/${username}`, {
		method: "GET",
		headers: isAuth(),
	});

	return await promise.then(async (res) => await res.json());
}
