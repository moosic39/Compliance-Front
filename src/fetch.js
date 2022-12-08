const PATH = "http://127.0.0.1:3000";

function isAuth() {
  const token = document.cookie.get();
  const headers = { "Content-Type": "application/json; charset=UTF-8" };
  if (token) {
    headers.token = token;
  }
  return headers;
}

// -------------------- SITE ----------------------------

export function getDataFromSite(idSite) {
  const promise = fetch(PATH + "/site-info/" + idSite, {
    method: "GET",
    headers: isAuth(),
  });
  return promise.then((response) => response.json());
}

export function getDataFromAllSite() {
  const promise = fetch(PATH + "/site-info/", {
    headers: isAuth(),
  });
  return promise.then((response) => response.json());
}

// -------------------- PRODUCT ----------------------------

export function getLineInfoFromSite(idSite) {
  const promise = fetch(PATH + "/site-line/" + idSite, {
    headers: isAuth(),
  });
  return promise.then((response) => response.json());
}

export function putLineInfoFromSite(productionRate, idLine, idSite) {
  const promise = fetch(PATH + "/site-line/" + idSite, {
    method: "PUT",
    headers: isAuth(),
    body: JSON.stringify({
      newProductionRate: productionRate,
      idLine,
    }),
  });
  return promise.then((response) => response.json());
}

export function getProductFromSite(idSite) {
  const promise = fetch(PATH + "/get-product-for-site/" + idSite);
  return promise.then((response) => response.json());
}

export function addNewLine(idSite, product) {
  const promise = fetch(PATH + "/new-production-line", {
    method: "POST",
    headers: isAuth(),
    body: JSON.stringify({
      idSite,
      product,
    }),
  });
  return promise.then((response) => response.json());
}

// -------------------- USER ----------------------------

export function auth(username, password) {
  const promise = fetch(PATH + "/signin", {
    method: "POST",
    headers: isAuth(),
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return promise.then((response) => response.json());
}

export function signIn(username, password) {
  const promise = fetch(PATH + "/signIn", {
    method: "POST",
    headers: isAuth(),
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return promise.then((response) => response.json());
}
