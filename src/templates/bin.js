/* @flow */
/* eslint-disable no-template-curly-in-string */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  packageName: string
}

export default function ({ packageName }: TemplateData): Template {
  const path = `src/bin/${packageName}.js`
  const content = file`
    #!/usr/bin/env node
    /* @flow */
    import greeting from '${packageName}/src/greeting'

    console.log(${'${greeting}'})
  `
  return { path, content }
}
