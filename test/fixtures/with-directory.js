import {temporaryDirectory} from 'tempy'
import fs from 'fs-extra'

export default function (test) {
  test.beforeEach(async (t) => {
    const directory = temporaryDirectory()
    await fs.ensureDir(directory)
    Object.assign(t.context, {directory})
  })

  test.afterEach.always(async (t) => {
    const {directory} = t.context
    await fs.remove(directory)
  })
}
