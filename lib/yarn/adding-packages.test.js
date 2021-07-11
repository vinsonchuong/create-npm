import path from 'node:path'
import test from 'ava'
import fs from 'fs-extra'
import {addPackages, removePackages} from './index.js'

test('adding packages', async (t) => {
  await addPackages(path.resolve(), 'development', ['left-pad'])

  const afterAdd = await fs.readJson('package.json')
  t.true('left-pad' in afterAdd.devDependencies)

  await removePackages(path.resolve(), ['left-pad'])

  const afterRemove = await fs.readJson('package.json')
  t.false('left-pad' in afterRemove.devDependencies)
})
