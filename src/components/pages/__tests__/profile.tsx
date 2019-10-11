import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Profile, ProfileProps } from '../profile'
import { contact } from '@/sagas/__stubs__/contact'

const props: ProfileProps = {
  contact: contact,
  loading: false,
  submitChecks: jest.fn(),
  submitChecksFormState: 'PENDING'
}

describe('Profile', () => {
  it('should match a snapshot when submitChecksFormState is SUBMITTING', () => {
    expect(toJson(shallow(<Profile {...props} submitChecksFormState="SUBMITTING" />))).toMatchSnapshot()
  })

  it('should match a snapshot when submitChecksFormState is SUCCESS', () => {
    expect(toJson(shallow(<Profile {...props} submitChecksFormState="SUCCESS" />))).toMatchSnapshot()
  })

  it('should match a snapshot when submitChecksFormState is PENDING', () => {
    expect(toJson(shallow(<Profile {...props} />))).toMatchSnapshot()
  })
})
