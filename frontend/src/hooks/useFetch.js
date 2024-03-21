export const host = "https://favlist.shre.in/";
// export const host = "http://localhost:5000/";

// Use Fetch
export async function useFetch (route, { method, authtoken='', body={} }) {
  var data = await fetch(`${host}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      authtoken
    },
    body: JSON.stringify(body)
  })
  data = await data.json()
  return data
}

// Fetch Auth Token
export function useFetchToken () {
  var auth = JSON.parse(localStorage.getItem('auth'))
  if(!auth) return {exp: '', token: ''}
  var { exp, token } = auth
  return {exp, token}
}