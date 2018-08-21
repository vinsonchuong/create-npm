/* @flow */
import test from 'ava'
import * as path from 'path'
import { readJson } from 'fs-extra'
import { addPackages, removePackages } from './'

test('adding packages', async t => {
  await addPackages(path.resolve(), 'development', ['left-pad'])

  const afterAdd = await readJson('package.json')
  t.true('left-pad' in afterAdd.devDependencies)

  await removePackages(path.resolve(), ['left-pad'])

  const afterRemove = await readJson('package.json')
  t.false('left-pad' in afterRemove.devDependencies)
})
