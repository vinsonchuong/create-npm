export default function () {
  return {
    path: '.npmignore',
    content: `
      yarn.lock
      .gitignore
      .github/

      **/*.test.js
      **/test.js
      test/
    `,
  }
}
