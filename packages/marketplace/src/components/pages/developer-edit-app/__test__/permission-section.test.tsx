import * as React from 'react'
import { shallow } from 'enzyme'
import PermissionSection, { PermissionSectionProps, renderScopesCheckbox } from '../permission-section'

const mockProps: PermissionSectionProps = {
  scopes: [
    {
      name: 'test',
      description: '',
    },
  ],
  errors: {
    scopes: 'test',
  },
}

describe('MarketplaceStatusSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PermissionSection {...mockProps} />)).toMatchSnapshot()
  })
  describe('MarketplaceStatusSection', () => {
    it('should match a snapshot', () => {
      const wrapper = shallow(<div>{renderScopesCheckbox(mockProps.scopes, mockProps.errors.scopes)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
