# graphql-app

## How to setup
Set up workspace experimental to true
- `yarn config set workspaces-experimental true`

Install dependencies
- `yarn`

## How to add dependencies for root project
- `./wapp add global <dependency_name>` OR `yarn add -D <dependency_name> -W` or `yarn add <dependency_name> --ignore-workspace-root-check`

## How to add dependencies to particular project
- `./wapp add <package_name> <dependency_name>` OR `yarn workspace <package_name> add <dependency_name>`

## How to add dev dependencies to particular project
- `./wapp add-dev <package_name> <dependency_name>` OR `yarn workspace <package_name> add -D <dependency_name>`

## How to run particular project
- `./wapp dev <package_name> <dependency_name>` OR `yarn workspace <package_name> dev`

## How to run test particular project
- `./wapp test <package_name> --watch` OR `yarn workspace <package_name> test --watch`

## How to create new project on packages
- `yarn workspace react-app-scaffolder scaffold`

## Read on:

- [Getting Started](./docs/GETTING_STARTED.md)
- [Api Platform](./docs/API_PLATFORM.md)
- [Code Style](./docs/CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./docs/DEFINITION_OF_DONE.md)
- [Deployment](./docs/DEPLOYMENT.md)

# How to migrate app from their own repo to mono repo?
Here is an example for lifetime-legal app
- Step 1: Change dir to <app_name>
- Step 2: Run command `mkdir -p packages/<app_name> && rm -rf node_modules && rm -rf .DS_Store`.  
Example: `mkdir -p packages/lifetime-legal && rm -rf node_modules && rm -rf .DS_Store`
- Step 3: Run command `ls -a1 | grep -v ^<app_name> | xargs -I{} git mv {} packages/<app_name>`  
Example: `ls -a1 | grep -v ^lifetime-legal | xargs -I{} git mv {} packages/lifetime-legal`
- Step 4: commit this change by message "chore: migration <app_name>"
- Step 5: Change dir to foundation mono repo and backup by `mkdir -p ~/Desktop/githooks && cp .git/hooks/* ~/Desktop/githooks`
- Step 6: Add remote of repo want to migrate by command `git remote add <app_name> <dir_to_app_name>`  
Example: `git remote add lifetime-legal /Users/<your_user>/Desktop/lifetime-legal`
- Step 7: Run command `git fetch <app_name>` to fetch master of repo want to migrate.  
Example: `git fetch lifetime-legal`
- Step 8: Run command to merge `git merge <app_name>/master --allow-unrelated-histories`  
Example: `git merge lifetime-legal/master --allow-unrelated-histories`
- Step 9: Remove remote unuse by `git remote remove <app_name>`  
Example: `git remote remove lifetime-legal`
- Step 10: Remove redundant things and also run command `rm -rf .git/hooks && mkdir -p .git/hooks && cp ~/Desktop/githooks/* .git/hooks/`
- Step 11: Fix linter
- Step 12: Commit and push it to review
