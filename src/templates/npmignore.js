export default function () {
  return {
    path: '.npmignore',
    content: `
      **/*.test.js
      **/test.js
      test/
    `
  }
}
