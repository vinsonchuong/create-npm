import * as http from 'node:http'
import test from 'ava'
import pEvent from 'p-event'
import {sendRequest} from './index.js'

test('sending GET requests', async (t) => {
  const server = http.createServer((request, response) => {
    t.is(request.method, 'GET')
    t.is(request.url, '/path')

    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.end(
      JSON.stringify({
        message: 'Pong'
      })
    )
  })
  server.listen(10_000)
  await pEvent(server, 'listening')

  const response = await sendRequest({
    method: 'GET',
    url: 'http://127.0.0.1:10000/path',
    headers: {}
  })

  t.is(response.status, 200)
  t.is(response.headers['content-type'], 'application/json')
  t.deepEqual(response.body, {message: 'Pong'})

  server.close()
  await pEvent(server, 'close')
})

test('sending POST requests', async (t) => {
  const server = http.createServer(async (request, response) => {
    t.is(request.method, 'POST')
    t.is(request.url, '/path')
    t.is(request.headers['content-type'], 'application/json')

    let body = ''
    request.on('data', (data) => {
      body += data
    })
    await pEvent(request, 'end')

    t.deepEqual(JSON.parse(body), {message: 'Ping'})

    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.end(
      JSON.stringify({
        message: 'Pong'
      })
    )
  })
  server.listen(10_001)
  await pEvent(server, 'listening')

  const response = await sendRequest({
    method: 'POST',
    url: 'http://127.0.0.1:10001/path',
    headers: {},
    body: {
      message: 'Ping'
    }
  })

  t.is(response.status, 200)
  t.is(response.headers['content-type'], 'application/json')
  t.deepEqual(response.body, {message: 'Pong'})

  server.close()
  await pEvent(server, 'close')
})
