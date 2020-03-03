const loginPageMetadata = {
  selectors: {
    inputEmail: 'input#userName',
    inputPassword: 'input#password',
    buttonLogin: "button[type='submit']",
  },
}

const loginPage = {
  ...loginPageMetadata,
  actions: {},
}

export default loginPage
