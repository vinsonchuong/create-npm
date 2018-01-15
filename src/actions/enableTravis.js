/* @flow */
import { exec, sleep } from 'create-npm/src/io'

export default async function(slug: string): Promise<void> {
  await sync(slug)
  await exec(`travis enable --no-interactive --repo '${slug}'`)
}

async function sync(slug: string): Promise<void> {
  await exec('travis sync')
  const syncedRepos = await exec('travis repos --no-interactive')
  if (!syncedRepos.includes(slug)) {
    await sleep(1000)
    return sync(slug)
  }
}
