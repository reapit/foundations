import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Register, mapStateToProps, mapDispatchToProps, handleSubmitCreateDeveloper } from '../register'
import { FormState, ReduxState } from '../../../types/core'
import { Formik, FormikProps } from 'formik'
import { mockWithFormik } from '@/utils/mock-formik'

jest.mock('react-router-dom')

const props = {
  formState: 'PENDING' as FormState,
  developerCreate: jest.fn(),
  developerSetFormState: jest.fn(),
  ...mockWithFormik({
    name: '123',
    companyName: '123',
    email: '123@gmail.com',
    telephone: '123',
    password: '123123',
    confirmPassword: '123123',
    agreedTerms: '123'
  })
}

describe('Register', () => {
  it('should match a snapshot for PENDING state', () => {
    expect(toJson(shallow(<Register {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot for SUCCESS state', () => {
    expect(toJson(shallow(<Register {...{ ...props, formState: 'SUCCESS' }} />))).toMatchSnapshot()
  })

  describe('handleSubmitCreateDeveloper', () => {
    it('should run corectly', () => {
      const mockValues = {
        name: '123',
        companyName: '123',
        email: '123@gmail.com',
        telephone: '123',
        password: '123123',
        confirmPassword: '123123',
        agreedTerms: '123'
      }
      const mockProps = {
        developerCreate: jest.fn()
      }
      handleSubmitCreateDeveloper(mockValues, { props: mockProps })
      expect(mockProps.developerCreate).toBeCalled()
    })
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

  describe('mapDispatchToProps', () => {
    it('developerCreate', () => {
      const mockDispatch = jest.fn()
      const { developerCreate } = mapDispatchToProps(mockDispatch)
      developerCreate({})
      expect(mockDispatch).toBeCalled()
    })
    it('developerSetFormState', () => {
      const mockDispatch = jest.fn()
      const { developerSetFormState } = mapDispatchToProps(mockDispatch)
      developerSetFormState('PENDING')
      expect(mockDispatch).toBeCalled()
    })
  })
})
