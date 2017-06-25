/* @flow */
import { exec } from 'create-npm/src/io'

export default async function (slug: string): Promise<void> {
  await exec('travis sync')
  await exec(`travis enable --repo '${slug}'`)
}
