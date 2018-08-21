/* @flow */
import { sendRequest } from 'create-npm/lib/http'

export default async function(repoName: string, token: string): Promise<void> {
  await sendRequest({
    method: 'POST',
    url: `https://api.travis-ci.org/repo/${encodeURIComponent(
      repoName
    )}/deactivate`,
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    }
  })
}
