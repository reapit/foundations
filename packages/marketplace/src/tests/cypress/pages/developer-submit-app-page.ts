import routes from '@/constants/routes'

export default {
  url: routes.SUBMIT_APP,
  selectors: {
    name: 'input[name=name]',
    category: 'select[name="categoryId"]',
    supportEmail: 'input[name=supportEmail]',
    telephone: 'input[name=telephone]',
    homePage: 'input[name=homePage]',
    launchUri: 'input[name=launchUri]',
    summary: 'textarea[name=summary]',
    description: 'textarea[name=description]',
    authFlow: 'input[name=authFlow][value=authorisationCode]',
    redirectUris: 'input[name=redirectUris]',
    signoutUris: 'input[name=signoutUris]',
    isPrivateApp: 'input[name=isPrivateApp][value=no]',
    iconImage: 'input#iconImage',
    screenshot1: 'input#screenshot1',
    submitButton: 'button[data-test=submit-app-button]',
    divSuccess: 'div[data-test=submit-success-section]',
  },
}
