/* eslint-disable import/unambiguous */
module.exports = function(outputMap) {
  const args = process.argv.slice(2).join(' ')
  if (args in outputMap) {
    process.stdout.write(`${outputMap[args]}\n`)
  } else {
    throw new Error(`Unexpected Args: ${args}`)
  }
}
