export default {
  actions: {
    clickAppCardWithName(name: string) {
      return cy.get(`div[data-test-app-name="${name}"]`).click()
    },
    clickAppCardSettingWithId(id: string) {
      return cy.get(`div[data-test="app-settings_${id}"]`).click()
    },
  },
}
