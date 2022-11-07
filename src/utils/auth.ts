import Cookies from "js-cookie";

const TokenKey = "Login-Tokens";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  const _t = 30 * 24 * 60 * 60;
  Cookies.set(TokenKey, token, { expires: _t || 1 });
}

export function removeToken() {
  Cookies.remove(TokenKey, { path: "/" });
}
