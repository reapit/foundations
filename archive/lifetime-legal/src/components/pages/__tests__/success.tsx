import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  SuccessPage,
  SuccessProps,
  handleUseEffect,
  handleSubmit,
  mapStateToProps,
  mapDispatchToProps,
} from '../success'
import { contact as contactStub, contact } from '@/sagas/__stubs__/contact'
import { EntityType } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'

const props: SuccessProps = {
  submitComplete: jest.fn(),
  submitCompleteFormState: 'PENDING',
  contact: contactStub,
  loginMode: 'WEB' as LoginMode,
  // @ts-ignore only pick needed props
  match: {
    params: {
      id: contactStub.id,
    },
  },
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

  describe('handleUseEffect', () => {
    it('should run corectly', () => {
      const mockFn = jest.fn()
      const fn = handleUseEffect(mockFn)
      fn()
      expect(mockFn).toBeCalled()
    })
  })

  describe('handleSubmit', () => {
    it('should run corectly', () => {
      const submitComplete = jest.fn()
      const id = ''
      const dynamicLinkParams = {}
      const fn = handleSubmit({ submitComplete, id, dynamicLinkParams })
      fn()
      expect(submitComplete).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick neccessary props
      const mockState = {
        success: {
          submitCompleteFormState: 'DONE',
        },
        checklistDetail: {
          checklistDetailData: {
            contact: contact,
          },
        },
      } as ReduxState
      const output = {
        submitCompleteFormState: 'DONE',
        contact: contact,
        loginMode: 'WEB',
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('submitComplete', () => {
      const mockDispatch = jest.fn()
      const { submitComplete } = mapDispatchToProps(mockDispatch)
      submitComplete('', { appMode: 'DESKTOP', entityType: EntityType.CONTACT })
      expect(mockDispatch).toBeCalled()
    })

    it('resetSubmitCompleteFormState', () => {
      const mockDispatch = jest.fn()
      const { resetSubmitCompleteFormState } = mapDispatchToProps(mockDispatch)
      resetSubmitCompleteFormState()
      expect(mockDispatch).toBeCalled()
    })
  })
})
