import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SuccessPage, SuccessProps } from '../success'
import { contact as contactStub } from '@/sagas/__stubs__/contact'

const props: SuccessProps = {
  submitComplete: jest.fn(),
  submitCompleteFormState: 'PENDING',
  contact: contactStub,
  // @ts-ignore only pick needed props
  match: {
    params: {
      id: contactStub.id
    }
  }
}

describe('SuccessPage', () => {
  it('should match a snapshot when submitCompleteFormState is SUBMITTING', () => {
    expect(toJson(shallow(<SuccessPage {...props} submitCompleteFormState="SUBMITTING" />))).toMatchSnapshot()
  })

  it('should match a snapshot when submitCompleteFormState is SUCCESS', () => {
    expect(toJson(shallow(<SuccessPage {...props} submitCompleteFormState="SUCCESS" />))).toMatchSnapshot()
  })

  it('should match a snapshot when submitCompleteFormState is PENDING', () => {
    expect(toJson(shallow(<SuccessPage {...props} />))).toMatchSnapshot()
  })
})
