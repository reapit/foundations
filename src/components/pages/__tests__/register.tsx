import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Register } from '../register'
import { FormState } from '../../../types/core'
import { Formik } from 'formik'

jest.mock('react-router-dom')

const props = {
  developerCreate: jest.fn(),
  formState: 'PENDING' as FormState
}

describe('Register', () => {
  it('should match a snapshot for PENDING state', () => {
    expect(toJson(shallow(<Register {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot for SUCCESS state', () => {
    expect(toJson(shallow(<Register {...{ ...props, formState: 'SUCCESS' }} />))).toMatchSnapshot()
  })

  it('should call developerCreate on submit', () => {
    const wrapper = shallow(<Register {...props} />)
    wrapper
      .find(Formik)
      .first()
      .simulate('submit')
    expect(props.developerCreate).toHaveBeenCalledTimes(1)
  })
})
