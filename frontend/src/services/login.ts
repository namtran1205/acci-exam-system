import { makeJsonHeader, PUBLIC_API } from "./main";

export async function postLogin(username: string, password: string) {
  const res = await fetch(`${PUBLIC_API}/login`, {
    method: "POST",
    headers: makeJsonHeader(),
    body: JSON.stringify({ username: username, password: password }),
  });

  return [res.status, await res.json().catch((_) => null)];
}
