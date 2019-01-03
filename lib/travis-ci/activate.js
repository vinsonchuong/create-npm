/* @flow */
import { sendRequest } from 'create-npm/lib/http'
import { sync } from './'

export default async function(repoName: string, token: string): Promise<void> {
  let status = null
  while (status !== 200) {
    await sync(token)

    const response = await sendRequest({
      method: 'POST',
      url: `https://api.travis-ci.org/repo/${encodeURIComponent(
        repoName
      )}/activate`,
      headers: {
        'Travis-API-Version': '3',
        Authorization: `token ${token}`
      }
    })

    status = response.status
  }
}
