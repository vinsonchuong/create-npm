/* @flow */
import { sendRequest } from 'create-npm/lib/http'

export default async function(
  repoName: string,
  name: string,
  value: boolean | number,
  token: string
): Promise<void> {
  await sendRequest({
    method: 'PATCH',
    url: `https://api.travis-ci.org/repo/${encodeURIComponent(
      repoName
    )}/setting/${name}`,
    headers: {
      'Travis-API-Version': '3',
      Authorization: `token ${token}`
    },
    body: {
      'setting.value': value
    }
  })
}
