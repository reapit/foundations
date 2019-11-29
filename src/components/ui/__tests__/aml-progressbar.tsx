import React from 'react'
import { shallow } from 'enzyme'
import { AMLProgressBar, calculateProgress, mapStateToProps, mapDispatchToProps } from '../aml-progressbar'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { LoginMode } from '@reapit/elements'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'
import { STEPS } from '../modal/modal'
import { idCheck } from '@/sagas/__stubs__/id-check'
import { defaultStatus } from '@/constants/section-status'

describe('AMLProgressBar', () => {
  describe('AMLProgressBar', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact,
        status: sectionsStatus,
        id: 'AYL19000002',
        loginMode: 'WEB' as LoginMode,
        showModal: jest.fn(),
        idCheck: {}
      }
      const wrapper = shallow(<AMLProgressBar {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('calculateProgress', () => {
    const result = calculateProgress(sectionsStatus)
    const expected = { percentage: 40, completed: 2, total: 5 }
    expect(result).toEqual(expected)
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: {
            mode: 'WEB'
          }
        },
        checklistDetail: {
          checklistDetailData: {
            contact,
            idCheck
          },
          status: sectionsStatus
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        loginMode: 'WEB',
        contact,
        idCheck,
        status: sectionsStatus
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        loginMode: 'WEB',
        contact: null,
        idCheck: null,
        status: defaultStatus
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { showModal } = mapDispatchToProps(mockDispatch)
      showModal(STEPS.PROFILE)
      expect(mockDispatch).toBeCalled()
    })
  })
})
