import { mockAppDetailModel } from '../../../../tests/__stubs__/apps'
import { handleSetDefaultFormValues } from '../handle-default-form-values'

describe('handleSetDefaultFormValues', () => {
  it('should handle setting form values with a completed model', () => {
    const setAppEditForm = jest.fn()
    const appDetail = mockAppDetailModel
    const developerId = 'MOCK_DEVELOPER_ID'

    const curried = handleSetDefaultFormValues(setAppEditForm, appDetail, developerId)

    curried()

    const formValues = {
      categoryIds: '',
      authFlow: 'authorisationCode',
      screen5ImageUrl: '',
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: 'https://foo.bar',
      name: 'will-test-dev-co-voracious-person',
      telephone: '07777777777',
      supportEmail: 'foo@bar.com',
      launchUri: 'https://foo.bar',
      iconImageUrl: 'https://foo.bar',
      homePage: 'https://foo.bar',
      description: 'Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar',
      summary: 'Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar',
      developerId: 'MOCK_DEVELOPER_ID',
      scopes: 'agencyCloud/applicants.read,agencyCloud/images.read,agencyCloud/properties.read',
      redirectUris: 'https://foo.bar',
      signoutUris: 'https://foo.bar',
      limitToClientIds: '',
      desktopIntegrationTypeIds: '',
      isFree: false,
      privacyPolicyUrl: 'https://foo.bar',
      pricingUrl: 'https://foo.bar',
      termsAndConditionsUrl: 'https://foo.bar',
      products: 'agencyCloud',
      isListed: true,
      isAgencyCloudIntegrated: false,
      deletionProtection: false,
      isPrivateApp: false,
      videoUrl1: 'https://www.youtube.com/embed/iKdil7liAts',
      videoUrl2: '',
    }

    expect(setAppEditForm).toHaveBeenCalledWith(formValues)
  })

  it('should handle setting form values with an empty model', () => {
    const setAppEditForm = jest.fn()
    const appDetail = {}
    const developerId = 'MOCK_DEVELOPER_ID'

    const curried = handleSetDefaultFormValues(setAppEditForm, appDetail, developerId)

    curried()

    const formValues = {
      categoryIds: '',
      authFlow: '',
      screen5ImageUrl: '',
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      developerId: 'MOCK_DEVELOPER_ID',
      scopes: '',
      redirectUris: '',
      signoutUris: '',
      limitToClientIds: '',
      desktopIntegrationTypeIds: '',
      isFree: false,
      privacyPolicyUrl: '',
      pricingUrl: '',
      termsAndConditionsUrl: '',
      products: '',
      isListed: false,
      isAgencyCloudIntegrated: true,
      isPrivateApp: false,
      deletionProtection: false,
      videoUrl1: '',
      videoUrl2: '',
    }

    expect(setAppEditForm).toHaveBeenCalledWith(formValues)
  })
})
