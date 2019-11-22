/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function({ repoName }: { repoName: string }): Template {
  const [, packageName] = repoName.split('/')

  return {
    path: '.flowconfig',
    content: `
      [ignore]
      .*/node_modules/config-chain/test/broken.json

      [include]

      [libs]

      [lints]

      [options]
      module.name_mapper='^${packageName}$' -> '<PROJECT_ROOT>'
      module.name_mapper='^${packageName}\\/\\(.*\\)$' -> '<PROJECT_ROOT>/\\1'
      sharedmemory.hash_table_pow=21

      [strict]
    `
  }
}
