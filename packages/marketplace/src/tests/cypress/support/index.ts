import 'cypress-plugin-retries'
import 'cypress-file-upload'

/**
 * See https://github.com/cypress-io/cypress/issues/95
 * Cypress doesn't support waiting for Fetch API atm
 * Solution: delete window.fetch while developing -> whatwg-fetch will kick in
 * whatwg-fetch is based on XMLHttpRequest and supported by Cypress
 */
Cypress.on('window:before:load', win => {
  delete win.fetch
})

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
})
