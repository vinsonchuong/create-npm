/* @flow */
import { sendRequest } from 'create-npm/lib/http'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

export default async function(token: string): Promise<void> {
  const {
    body: { id: userId, synced_at: lastSyncTime }
  } = await sendRequest({
    method: 'GET',
    url: 'https://api.travis-ci.org/user',
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    }
  })

  await sendRequest({
    method: 'POST',
    url: `https://api.travis-ci.org/user/${userId}/sync`,
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    }
  })

  while (true) {
    await sleep(1000)

    const {
      body: { synced_at: syncTime }
    } = await sendRequest({
      method: 'GET',
      url: 'https://api.travis-ci.org/user',
      headers: {
        'Travis-API-Version': '3',
        Authorization: `token ${token}`
      }
    })

    if (syncTime !== lastSyncTime) {
      return
    }
  }
}
