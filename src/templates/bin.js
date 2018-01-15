/* @flow */
/* eslint-disable no-template-curly-in-string */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  repoName: string
}

export default function({ repoName }: TemplateData): Template {
  const path = `src/bin/${repoName}.js`
  const content = file`
    #!/usr/bin/env node
    /* @flow */
    import greeting from '${repoName}'

    console.log(${'`${greeting}`'})
  `
  return { path, content }
}
