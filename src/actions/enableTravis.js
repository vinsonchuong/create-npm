/* @flow */
import { exec, sleep } from 'create-npm/src/io'

export default async function (slug: string): Promise<void> {
  await sync()
  await exec(`travis enable --repo '${slug}'`)
}

async function sync (): Promise<void> {
  try {
    await exec('travis sync')
  } catch (error) {
    if (error.message.includes('Sync already in progress')) {
      await sleep(1000)
      return sync()
    }
  }
}
