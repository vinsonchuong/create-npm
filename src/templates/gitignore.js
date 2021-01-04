export default function () {
  return {
    path: '.gitignore',
    content: `
      /node_modules

      /.yarn/*
      !/.yarn/releases
      !/.yarn/plugins
      !/.yarn/sdks
      !/.yarn/versions
    `
  }
}
