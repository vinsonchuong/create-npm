/* @flow */
import type { Template } from './'

type TemplateData = {
  authorName: string,
  authorEmail: string,
  packageName: string,
  repositorySlug: string
}

export default function({
  authorName,
  authorEmail,
  packageName,
  repositorySlug
}: TemplateData): Template {
  const path = 'package.json'
  const json = {
    name: packageName,
    version: '0.0.0',
    description: 'An awesome package',
    keywords: [],
    homepage: `https://github.com/${repositorySlug}`,
    bugs: `https://github.com/${repositorySlug}/issues`,
    license: 'MIT',
    author: `${authorName} <${authorEmail}>`,
    files: ['src'],
    main: './src/index.js',
    bin: `./src/bin/${packageName}.js`,
    repository: repositorySlug,
    scripts: {
      test: 'standard -v --fix && flow && ava',
      prepack: 'build-esm'
    },
    dependencies: {},
    devDependencies: {},
    babel: {
      presets: ['diff']
    },
    ava: {
      concurrency: 8,
      babel: 'inherit',
      require: ['babel-register']
    }
  }
  const content = JSON.stringify(json, null, 2)
  return { path, content }
}
