/* @flow */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  packageName: string
}

export default function({ packageName }: TemplateData): Template {
  const path = '.flowconfig'
  let content = file`
    [ignore]

    [include]

    [libs]

    [options]
  `
  content += `module.name_mapper='^${packageName}$' -> '<PROJECT_ROOT>'\n`
  content += `module.name_mapper='^${packageName}\\/\\(.*\\)$' -> '<PROJECT_ROOT>/\\1'\n`
  return { path, content }
}
