export default function () {
  return {
    path: '.github/workflows/dependabot.yml',
    content: `
      name: Dependabot
      on: pull_request
      jobs:
        dependabot:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - uses: ahmadnassri/action-dependabot-auto-merge@v2
              with:
                target: minor
                github-token: \${{ secrets.GITHUB_TOKEN }}
    `
  }
}