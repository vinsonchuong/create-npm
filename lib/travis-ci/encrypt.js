/* @flow */
import * as crypto from 'crypto'
import { promisify } from 'util'
import { sendRequest } from 'create-npm/lib/http'

const sleep = promisify(setTimeout)

export default async function(
  repoName: string,
  data: string,
  token: string
): Promise<string> {
  let publicKey
  while (!publicKey) {
    await sleep(2000)

    const response = await sendRequest({
      method: 'GET',
      url: `https://api.travis-ci.org/repo/${encodeURIComponent(
        repoName
      )}/key_pair/generated`,
      headers: {
        'Travis-API-Version': '3',
        Authorization: `token ${token}`
      }
    })

    publicKey = response.body.public_key
  }

  // $FlowFixMe
  return crypto
    .publicEncrypt(
      {
        key: publicKey,

        // $FlowFixMe
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      Buffer.from(data)
    )
    .toString('base64')
}
