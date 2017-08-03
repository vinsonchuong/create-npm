/* @flow */
import { exec, sleep } from 'create-npm/src/io'

export default async function(slug: string): Promise<void> {
  await sync()
  await exec(`travis enable --no-interactive --repo '${slug}'`)
}

async function sync(): Promise<void> {
  const status = await exec('travis sync --check --no-interactive')
  if (status === 'not syncing') {
    await exec('travis sync')
  } else {
    await sleep(1000)
    return sync()
  }
}
