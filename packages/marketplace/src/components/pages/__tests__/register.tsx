import * as React from 'react'
import { shallow } from 'enzyme'

import {
  Register,
  mapStateToProps,
  mapDispatchToProps,
  handleSubmitCreateDeveloper,
  RegisterProps,
  RegisterFormValues,
  handleSubmitButtonOnClick,
  HandleSubmitParams,
} from '../register'
import { FormState, ReduxState } from '../../../types/core'
import { mockWithFormik } from '@/utils/mock-formik'
import { FormikProps } from '@reapit/elements'

jest.mock('react-router-dom')

const props = {
  formState: 'PENDING' as FormState,
  developerCreate: jest.fn(),
  developerSetFormState: jest.fn(),
  getFieldHelpers: jest.fn(),
  ...mockWithFormik({
    name: '123',
    companyName: '123',
    email: '123@gmail.com',
    telephone: '123',
    password: '123123',
    confirmPassword: '123123',
    agreedTerms: '123',
  }),
} as RegisterProps & FormikProps<RegisterFormValues>

describe('Register', () => {
  it('should match a snapshot for PENDING state', () => {
    expect(shallow(<Register {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot for SUCCESS state', () => {
    expect(shallow(<Register {...{ ...props, formState: 'SUCCESS' }} />)).toMatchSnapshot()
  })

  describe('handleSubmitButtonOnClick', () => {
    /* eslint-disable-next-line max-len */
    it('should call handleOpenModal with correct params if promise returned by validateForm resolve empty object', done => {
      const fnReturnedByHandleOpenModal = jest.fn()
      const params: HandleSubmitParams = {
        handleOpenModal: jest.fn(() => fnReturnedByHandleOpenModal),
        validateForm: jest.fn(
          () =>
            new Promise(resolve => {
              resolve({})
            }),
        ),
        setVisible: jest.fn(),
        handleSubmit: jest.fn(),
      }

      handleSubmitButtonOnClick(params)()
      process.nextTick(() => {
        expect(params.handleOpenModal).toHaveBeenCalledWith(true, params.setVisible)
        expect(fnReturnedByHandleOpenModal).toHaveBeenCalled()
        done()
      })
    })
  })
  it('should call handleOpenModal if promise returned by validateForm resolve non empty object', async done => {
    const params: HandleSubmitParams = {
      handleOpenModal: jest.fn(),
      validateForm: jest.fn(
        () =>
          new Promise(resolve => {
            resolve({ telephone: 'required' })
          }),
      ),
      setVisible: jest.fn(),
      handleSubmit: jest.fn(),
    }

    handleSubmitButtonOnClick(params)()
    process.nextTick(() => {
      expect(params.handleSubmit).toHaveBeenCalled()
      done()
    })
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
        agreedTerms: '123',
      }
      const mockProps = {
        developerCreate: jest.fn(),
      }
      handleSubmitCreateDeveloper(mockValues, { props: mockProps })
      expect(mockProps.developerCreate).toBeCalled()
    })
  })

  it('mapStateToProps', () => {
    const mockState = {
      developer: {
        formState: 'PENDING',
      },
    } as ReduxState
    const result = mapStateToProps(mockState)
    const output = {
      formState: 'PENDING',
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
