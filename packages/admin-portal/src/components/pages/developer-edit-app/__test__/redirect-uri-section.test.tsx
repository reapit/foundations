import * as React from 'react'
import { shallow } from 'enzyme'
import RedirectUriSection, { RedirectUriSectionProps } from '../redirect-uri-section'

const mockProps: RedirectUriSectionProps = {
  setFieldValue: jest.fn(),
  authFlow: 'test',
  isPrivateApp: 'no',
}

describe('MarketplaceStatusSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<RedirectUriSection {...mockProps} />)).toMatchSnapshot()
  })
})
