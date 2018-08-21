/* @flow */
import { sendRequest } from 'create-npm/lib/http'

export default async function(
  repoName: string,
  token: string
): Promise<boolean> {
  const response = await sendRequest({
    method: 'GET',
    url: `https://api.travis-ci.org/repo/${encodeURIComponent(repoName)}`,
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    }
  })
  return response.body.active
}
