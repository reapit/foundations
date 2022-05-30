import React from 'react'
import { ContactDeveloperSection, ContactDeveloperSectionType } from '../contact-developer-section'
import { render } from '../../../tests/react-testing'

const props: ContactDeveloperSectionType = {
  contact: {
    developer: 'Reapit Ltd',
    telephone: '0777 777 777',
    supportEmail: 'reapit@reapit.com',
    homePage: 'https://reapit.com',
    isFree: true,
    privacyPolicyUrl: 'https://reapit.com',
    pricingUrl: 'https://reapit.com',
    termsAndConditionsUrl: 'https://reapit.com',
  },
}

describe('ContactDeveloperSection', () => {
  test('should match snapshot without gutter', () => {
    expect(render(<ContactDeveloperSection {...props} hasGutter={false} />)).toMatchSnapshot()
  })

  test('should match snapshot with gutter', () => {
    expect(render(<ContactDeveloperSection {...props} hasGutter />)).toMatchSnapshot()
  })
})
