import * as React from 'react'
import { shallow } from 'enzyme'
import AuthenticationFlowSection, { AuthenticationFlowSectionProps } from '../authentication-flow-section'

const mockProps: AuthenticationFlowSectionProps = {
  isSubmitApp: false,
  setFieldValue: jest.fn(),
  authFlow: '',
}

describe('AuthenticationFlowSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AuthenticationFlowSection {...mockProps} />)).toMatchSnapshot()
  })
})
