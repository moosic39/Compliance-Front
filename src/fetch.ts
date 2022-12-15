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

// Create
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

  return await promise.then(async (res) => await res.json());
}

// Read
export async function signin(username: string, password: string) {
  const promise = fetch(PATH + "/users/signin", {
    method: "POST",
    headers: isAuth(),
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return await promise.then(async (res) => await res.json());
}

// Read
export async function getInfo(username: string) {
  const promise = fetch(`${PATH}/users/settings/${username}`, {
    method: "GET",
    headers: isAuth(),
  });

  return await promise.then(async (res) => await res.json());
}

// Update
export async function putInfo(infos: object, username: string) {
  const promise = fetch(`${PATH}/users/settings/${username}`, {
    method: "PUT",
    headers: isAuth(),
    body: JSON.stringify({ ...infos }),
  });

  return await promise.then(async (res) => await res.json());
}

// Delete
export async function deleteUser(username: string) {
  const promise = fetch(`${PATH}/users/settings/${username}`, {
    method: "DELETE",
    headers: isAuth(),
  });

  return await promise.then(async (res) => await res.json());
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
