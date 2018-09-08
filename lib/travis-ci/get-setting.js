/* @flow */
import { sendRequest } from 'create-npm/lib/http'

export default async function(
  repoName: string,
  name: string,
  token: string
): Promise<void> {
  const response = await sendRequest({
    method: 'GET',
    url: `https://api.travis-ci.org/repo/${encodeURIComponent(
      repoName
    )}/setting/${name}`,
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    }
  })

  return response.body.value
}
