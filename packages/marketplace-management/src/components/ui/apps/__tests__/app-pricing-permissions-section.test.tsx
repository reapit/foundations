import * as React from 'react'
import { render } from '@testing-library/react'
import AppPricingPermissionsSection from '../app-pricing-permissions-section'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER', desktopIntegrationTypeIds: ['ID'] } as AppDetailModel
const stubDesktopIntegrationTypes = [
  { id: 'ID', name: 'NAME', description: 'DESCRIPTION' },
] as DesktopIntegrationTypeModel[]

describe('AppPricingPermissionsSection', () => {
  it('should match a snapshot for not desktop', () => {
    expect(
      render(
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
      render(
        <AppPricingPermissionsSection app={stubApp} desktopIntegrationTypes={stubDesktopIntegrationTypes} isDesktop />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for has a pricing uri', () => {
    expect(
      render(
        <AppPricingPermissionsSection
          app={{ ...stubApp, pricingUrl: 'SOME_URL' }}
          desktopIntegrationTypes={stubDesktopIntegrationTypes}
          isDesktop
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for has a pricing uri and not desktop', () => {
    expect(
      render(
        <AppPricingPermissionsSection
          app={{ ...stubApp, pricingUrl: 'SOME_URL' }}
          desktopIntegrationTypes={stubDesktopIntegrationTypes}
          isDesktop={false}
        />,
      ),
    ).toMatchSnapshot()
  })
})
