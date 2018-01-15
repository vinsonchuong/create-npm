/* @flow */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  repoName: string
}

export default function({ repoName }: TemplateData): Template {
  const path = '.flowconfig'
  let content = file`
    [ignore]

    [include]

    [libs]

    [options]
  `
  content += `module.name_mapper='^${repoName}$' -> '<PROJECT_ROOT>'\n`
  content += `module.name_mapper='^${repoName}\\/\\(.*\\)$' -> '<PROJECT_ROOT>/\\1'\n`
  return { path, content }
}
