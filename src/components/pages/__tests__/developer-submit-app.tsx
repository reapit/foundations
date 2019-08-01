import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SubmitApp, SubmitAppProps } from '../developer-submit-app'

const props: SubmitAppProps = {
  submitApp: jest.fn(),
  submitAppSetFormState: jest.fn(),
  submitAppState: {
    formState: 'DONE'
  },
  developerId: null
}

describe('DeveloperSubmitApp', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })
})
