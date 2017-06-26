/* @flow */
import type { Template } from './'
import dedent from 'dedent'

type TemplateData = {
  packageName: string
}

export default function ({ packageName }: TemplateData): Template {
  const path = `src/bin/${packageName}.js`
  const content = dedent`
    #!/usr/bin/env node
    /* @flow */
    import greeting from '${packageName}/src/greeting'

    process.stdout.write(\`\${greeting}\n\`)
  `
  return { path, content }
}
