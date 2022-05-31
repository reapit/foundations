import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { UpdateStatus, mapStateToProps, mapDispatchToProps } from '../update-status'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { EntityType } from '@reapit/elements-legacy'
import { defaultStatus } from '@/constants/section-status'
import Routes from '@/constants/routes'

describe('UpdateStatus', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      contact,
      status: sectionsStatus,
      loginMode: 'WEB',
      updateIdentityCheckStatus: jest.fn(),
      idCheckStatus: 'unchecked',
    }
    const wrapper = render(<UpdateStatus {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact,
            idCheck: {
              status: 'checked',
            },
          },
          status: sectionsStatus,
          isSubmitting: false,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        isSubmitting: false,
        contact,
        status: sectionsStatus,
        idCheckStatus: 'checked',
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        isSubmitting: false,
        contact: null,
        status: defaultStatus,
        idCheckStatus: 'unchecked',
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { updateIdentityCheckStatus } = mapDispatchToProps(mockDispatch)
      updateIdentityCheckStatus(
        { status: 'pass' },
        {
          entityType: EntityType.CONTACT,
          entityCode: '1',
          appMode: 'WEB',
          webRoute: `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/$1`,
        },
      )
      expect(mockDispatch).toBeCalled()
    })
  })
})
