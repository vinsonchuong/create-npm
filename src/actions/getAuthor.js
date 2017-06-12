/* @flow */
import { getAuthorName, getAuthorEmail } from 'create-npm/src/actions'

export default async function (): Promise<string> {
  const name = await getAuthorName()
  const email = await getAuthorEmail()
  return `${name} <${email}>`
}
