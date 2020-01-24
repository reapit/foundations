import * as React from 'react'
import { shallow } from 'enzyme'
import {
  ConfirmUninstall,
  ConfirmUninstallProps,
  mapDispatchToProps,
  mapStateToProps,
  TerminatedValues,
  handleSuccessUninstall,
  handleSubmit,
} from '../confirm-uninstall'
import { ReduxState, FormState } from '@/types/core'
import { UninstallParams } from '@/actions/app-installations'
import { installationStub } from '@/sagas/__stubs__/installation'
import { FormikProps } from '@reapit/elements'
import { mockWithFormik } from '@/utils/mock-formik'

const props = {
  appName: '1',
  afterClose: jest.fn(),
  formState: 'PENDING',
  setFormState: jest.fn(),
  setAppDetailStale: jest.fn(),
  installationDetail: installationStub,
  onUninstallSuccess: jest.fn(),
  uninstallApp: jest.fn(),
  getFieldHelpers: jest.fn(),
  ...mockWithFormik({ terminatedReason: '' }),
} as ConfirmUninstallProps & FormikProps<TerminatedValues>

describe('ConfirmUninstall', () => {
  it('should match a snapshot when FORMSTATE is PENDING', () => {
    expect(shallow(<ConfirmUninstall {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when FORMSTATE is SUBMITTING', () => {
    const newProps = { ...props, formState: 'SUBMITTING' as FormState }
    expect(shallow(<ConfirmUninstall {...newProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot when FORMSTATE is SUCCESS', () => {
    const newProps = { ...props, formState: 'SUCCESS' as FormState }
    expect(shallow(<ConfirmUninstall {...newProps} />)).toMatchSnapshot()
  })

  describe('handleSuccessUninstall', () => {
    it('should run correctly', () => {
      const onUninstallSuccess = jest.fn()
      const setFormState = jest.fn()
      const setAppDetailStale = jest.fn()
      handleSuccessUninstall({ onUninstallSuccess, setFormState, setAppDetailStale })()
      expect(onUninstallSuccess).toBeCalled()
    })
  })

  describe('handleSubmit', () => {
    it('should run corectly', () => {
      const mockValues = {
        terminatedReason: 'test',
      }
      const mockProps = {
        uninstallApp: jest.fn(),
      }
      handleSubmit(mockValues, { props: mockProps })
      expect(mockProps.uninstallApp).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        installations: {
          formState: 'PENDING',
        },
      } as ReduxState
      const expected = {
        formState: 'PENDING',
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn()
    const fn = mapDispatchToProps(dispatch)
    it('setFormState', () => {
      fn.setFormState('PENDING')
      expect(dispatch).toBeCalled()
    })
    it('setFormState', () => {
      fn.uninstallApp({ installationId: '1' } as UninstallParams)
      expect(dispatch).toBeCalled()
    })
  })
})
