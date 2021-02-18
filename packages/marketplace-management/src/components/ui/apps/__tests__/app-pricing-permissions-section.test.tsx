import * as React from 'react'
import { mount } from 'enzyme'
import AppPricingPermissionsSection from '../app-pricing-permissions-section'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER', desktopIntegrationTypeIds: ['ID'] } as AppDetailModel
const stubDesktopIntegrationTypes = [
  { id: 'ID', name: 'NAME', description: 'DESCRIPTION' },
] as DesktopIntegrationTypeModel[]

describe('AppPricingPermissionsSection', () => {
  it('should match a snapshot for not desktop', () => {
    expect(
      mount(
        <AppPricingPermissionsSection
          app={stubApp}
          desktopIntegrationTypes={stubDesktopIntegrationTypes}
          isDesktop={false}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for desktop', () => {
    expect(
      mount(
        <AppPricingPermissionsSection app={stubApp} desktopIntegrationTypes={stubDesktopIntegrationTypes} isDesktop />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for has a pricing uri', () => {
    expect(
      mount(
        <AppPricingPermissionsSection
          app={{ ...stubApp, pricingUrl: 'SOME_URL' }}
          desktopIntegrationTypes={stubDesktopIntegrationTypes}
          isDesktop
        />,
      ),
    ).toMatchSnapshot()
  })
})
