/**
 * The public API for this web application.
 */
export const PUBLIC_API = import.meta.env.VITE_PUBLIC_API;

/**
 * Forges a fetch() header object.
 *
 * @param auth Whether to include authorization header
 * @returns a headers object for `fetch()`
 */
export function makeJsonHeader(auth: boolean = false): HeadersInit {
  if (auth)
    return {
      Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  else
    return {
      "Content-Type": "application/json",
    };
}
