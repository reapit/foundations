import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Register, mapStateToProps, mapDispatchToProps } from '../register'
import { FormState, ReduxState } from '../../../types/core'
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

  it('mapStateToProps', () => {
    const mockState = {
      developer: {
        formState: 'PENDING'
      }
    } as ReduxState
    const result = mapStateToProps(mockState)
    const output = {
      formState: 'PENDING'
    }
    expect(result).toEqual(output)
  })

  it('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    const { developerCreate } = mapDispatchToProps(mockDispatch)
    developerCreate({})
    expect(mockDispatch).toBeCalled()
  })
})
