import {v1 as uuid} from 'uuid'
import fs from 'fs-extra'

export default function (test) {
  test.beforeEach(async (t) => {
    const directory = uuid()
    await fs.ensureDir(directory)
    Object.assign(t.context, {directory})
  })

  test.afterEach.always(async (t) => {
    const {directory} = t.context
    await fs.remove(directory)
  })
}
