# Version Control

When working on the project, please observe the following workflow:

- Branches are of three types `feature/...`, `hotfix/...` or `task/...` mapping to the JIRA ticket types of `story`, `bug` and `task`.
- Branch names should follow the pattern of `<issue type>/<JIRA-REF>-<brief-description>` for example `feature/LABS-1-some-cool-feature`.
- Typically, `develop` is the base branch for all branches, the exception being a hotfix on production code. In this case, `master` is the base and the hotfix should be back merged when deployed.
- Commits should be prefaced with the JIRA ref eg `"[LABS-1] My commit message"` so progress can be tracked on JIRA.
- To merge back into the base branch, raise a pull request aginst this branch. All checks should pass and at least one approver is necessary to merge into base.
- Keep your branch up to date at all times with the base branch by `rebase` only, to keep the tree clean.
- On merging to base, use `squash and merge`, to keep the tree clean and to make rolling back changes easy.

## Read on:

- [Home](../../README.md)
- [Getting Started](./GETTING_STARTED.md)
- [Api Platform](./API_PLATFORM.md)
- [Code Style](./CODE_STYLE.md)
- [Definition of Done](./DEFINITION_OF_DONE.md)
- [Deployment](./DEPLOYMENT.md)
