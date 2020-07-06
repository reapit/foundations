import * as React from 'react'
import { shallow } from 'enzyme'
import {
  DeveloperSubmitAppSuccessfully,
  DeveloperSubmitAppSuccessfullyProps,
} from '../developer-submit-app-successfully'

describe('DeveloperSubmitAppSuccessfully', () => {
  it('renders correctly', () => {
    const props: DeveloperSubmitAppSuccessfullyProps = {
      onGoBackToApps: jest.fn(),
      onSubmitAnotherApp: jest.fn(),
    }

    expect(shallow(<DeveloperSubmitAppSuccessfully {...props} />)).toMatchSnapshot()
  })
})
