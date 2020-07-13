import * as React from 'react'
import { shallow } from 'enzyme'
import MarketplaceStatusSection, { MarketplaceStatusSectionProps } from '../marketplace-status-section'

const mockProps: MarketplaceStatusSectionProps = {
  isSubmitRevision: false,
}

describe('MarketplaceStatusSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<MarketplaceStatusSection {...mockProps} />)).toMatchSnapshot()
  })
})
