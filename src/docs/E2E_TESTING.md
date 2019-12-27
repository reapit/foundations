## Required ENV

* DEVELOPER_ACCOUNT_EMAIL - email of the developer account that will be used to testing
* DEVELOPER_ACCOUNT_PASSWORD - password of the developer account that will be used to testing

* CLIENT_ACCOUNT_EMAIL - email of the client account that will be used to testing
* CLIENT_ACCOUNT_PASSWORD - password of the client account that will be used to testing

* ADMIN_ACCOUNT_EMAIL - email of the admin account that will be used to testing
* ADMIN_ACCOUNT_PASSWORD - password of the admin account that will be used to testing

* APPLICATION_URL - URL of the web application to test against

## Structure
- Files involved e2e testing will reside in `cypress`.
- Pages: Use `Page Object Model` pattern: store anything related to a specific page: selectors, reusable actions.
- Commands: Any utility actions that not involve specific page

## Commands
* yarn test-e2e:dev - open cypress dashboard allowed you to choose specific test file to testing
* yarn test-e2e - execute cypress tests in headless mode
