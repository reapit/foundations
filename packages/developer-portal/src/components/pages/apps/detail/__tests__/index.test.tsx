import React from 'react'
import { shallow } from 'enzyme'
import { AppDetail } from '..'
// import { PipelineDeploymentInfo } from '../../../v8/pipeline/deployment-info'

describe('App Detail v8', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <AppDetail
        // appDetailState={{
        //   data: {
        //     id: 'some-id',
        //     created: new Date().toISOString(),
        //     developerId: 'some-developer-id',
        //     name: 'name of app',
        //     summary: 'summary',
        //     description: 'description of app',
        //     developerAbout: 'developer about string',
        //     supportEmail: 'support@someaddress.com',
        //     telephone: '123456789',
        //     homePage: 'homepage.com',
        //     launchUri: 'string',
        //     redirectUris: [],
        //     signoutUris: [],
        //     limitToClientIds: [],
        //     desktopIntegrationTypeIds: [],
        //     installedOn: new Date().toISOString(),
        //     termsAndConditionsUrl: 'termsurl.com',
        //     privacyPolicyUrl: 'privacyurl.com',
        //     pricingUrl: 'pricingurl.com',
        //   },
        //   isLoading: false,
        //   errorMessage: null,
        // }}
        />,
      ),
    ).toMatchSnapshot()
  })

  // it('deployment info should match snapshot', () => {
  //   expect(shallow(<PipelineDeploymentInfo channel={{}} pipeline={{}} />)).toMatchSnapshot()
  // })
})
