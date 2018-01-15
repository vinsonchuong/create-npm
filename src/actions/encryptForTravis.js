/* @flow */
import { exec } from 'create-npm/src/io'

export default async function(slug: string, data: string): Promise<string> {
  const quotedPayload = await exec(
    `travis encrypt --no-interactive --repo '${slug}' '${data}'`
  )
  return quotedPayload.slice(1, -1)
}
