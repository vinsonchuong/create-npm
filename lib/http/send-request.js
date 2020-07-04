import fetch from 'cross-fetch'

export default async function (request) {
  const fetchResponse = await fetch(request.url, {
    method: request.method,
    headers: Object.assign({}, request.headers, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(request.body)
  })

  const headers = {}
  fetchResponse.headers.forEach((value, key) => {
    if (headers[key]) {
      headers[key] = `${headers[key]}, ${value}`
    } else {
      headers[key] = value
    }
  })

  return {
    status: fetchResponse.status,
    headers,
    body: await fetchResponse.json()
  }
}
