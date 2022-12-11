const PATH = "http://127.0.0.1:3000";

function isAuth() {
  const token = ""; // TODO cookies
  const headers: {
    "Content-Type": string;
    token?: string;
  } = {
    "Content-Type": "application/json; charset=UTF-8",
    token: "",
  };
  if (token !== "") {
    headers.token = token;
  }
  delete headers.token;
  return headers;
}

//
// // -------------------- SITE ----------------------------
//
// export async function getDataFromSite(idSite) {
//   const promise = fetch(PATH + "/site-info/" + idSite, {
//     method: "GET",
//     headers: isAuth(),
//   });
//   return await promise.then(async (response) => await response.json());
// }
//
// export async function getDataFromAllSite() {
//   const promise = fetch(PATH + "/site-info/", {
//     headers: isAuth(),
//   });
//   return await promise.then(async (response) => await response.json());
// }
//
// // -------------------- PRODUCT ----------------------------
//
// export async function getLineInfoFromSite(idSite) {
//   const promise = fetch(PATH + "/site-line/" + idSite, {
//     headers: isAuth(),
//   });
//   return await promise.then(async (response) => await response.json());
// }
//
// export async function putLineInfoFromSite(productionRate, idLine, idSite) {
//   const promise = fetch(PATH + "/site-line/" + idSite, {
//     method: "PUT",
//     headers: isAuth(),
//     body: JSON.stringify({
//       newProductionRate: productionRate,
//       idLine,
//     }),
//   });
//   return await promise.then(async (response) => await response.json());
// }
//
// export async function getProductFromSite(idSite) {
//   const promise = fetch(PATH + "/get-product-for-site/" + idSite);
//   return await promise.then(async (response) => await response.json());
// }
//
// export async function addNewLine(idSite, product) {
//   const promise = fetch(PATH + "/new-production-line", {
//     method: "POST",
//     headers: isAuth(),
//     body: JSON.stringify({
//       idSite,
//       product,
//     }),
//   });
//   return await promise.then(async (response) => await response.json());
// }

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
  return await promise.then(async (res) => await res.send());
}

export async function getAll(username: string) {
  const promise = fetch(`${PATH}/lists/${username}`, {
    method: "GET",
    headers: isAuth(),
  });

  return await promise.then(async (res) => await res.json());
}
