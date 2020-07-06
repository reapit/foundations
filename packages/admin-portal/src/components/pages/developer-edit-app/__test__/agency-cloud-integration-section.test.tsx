import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import AgencyCloudIntegrationSection, { prepareIntegrationTypeOptions } from '../agency-cloud-integration-section'
import { Formik, Form } from '@reapit/elements'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('AgencyCloudIntegrationSection', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <AgencyCloudIntegrationSection />
            </Form>
          </Formik>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('prepareIntegrationTypeOptions', () => {
    it('should run correctly', () => {
      const result = prepareIntegrationTypeOptions(integrationTypesStub.data || [])
      expect(result).toEqual([
        {
          description: 'Replaces the standard ID check screen',
          label: 'Identity Check',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#id-check',
          value: 'IdCheck',
        },
        {
          description: 'Replaces the standard property marketing screen',
          label: 'Property Marketing Information',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-marketing-information',
          value: 'PrpMarketing',
        },
        {
          description: 'Replaces the vendor marketing report',
          label: 'Vendor Marketing Report',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#vendor-marketing-report',
          value: 'VendorMarketing',
        },
        {
          description: 'Replaces the functionality to generate property particulars',
          label: 'Property Details Generation',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-detail-generation',
          value: 'PrintWizard',
        },
        {
          description: 'Provides ability to export a saved applicant to third party system',
          label: 'Applicant Export',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#applicant-export',
          value: 'AppExport',
        },
        {
          description: 'Launchable from the property screen',
          label: 'Property',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-1',
          value: 'Property',
        },
        {
          description: 'Launchable from the applicant scree',
          label: 'Applicant',
          link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#applicant',
          value: 'Applicant',
        },
      ])
    })
  })
})
