# Reapit Elements Legacy - v2.*

![lines](/packages/elements/src/tests/badges/badge-lines.svg) ![functions](/packages/elements/src/tests/badges/badge-functions.svg) ![branches](/packages/elements/src/tests/badges/badge-branches.svg) ![statements](/packages/elements/src/tests/badges/badge-statements.svg)

This project exists so we can offer LTS on our v2 of Elements. The package will work with the normal pipleines however, it has to be deployed manually so it can be released to NPM in the `@reapit/elements` namespace rather than `@reapit/elements-legacy`.

To release perform the following steps;

1. Bump version number, v2.*.*
2. Raise PR, ensure tests pass and new version deploys to dev.
3. Return to repo, run `yarn build:all` - this will build the main v2 dist, plus storybook and the latest v3 components (we export v3 from the `/v3` of v2 to allow easy migration).
4. **Temporarily** change the package name to `@reapit/elements` in the `package.json`
5. With the **prod** AWS creds in scope, run `yarn release && yarn publish --stage prod` - this will update the prod legacy storybook and release a v2 patch of Elements to NPM.