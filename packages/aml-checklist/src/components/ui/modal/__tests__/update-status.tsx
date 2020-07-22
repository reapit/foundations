import React from 'react'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { UpdateStatus, mapStateToProps, mapDispatchToProps } from '../update-status'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { EntityType } from '@reapit/elements'
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
    }
    const wrapper = shallow(<UpdateStatus {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact,
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
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        isSubmitting: false,
        contact: null,
        status: defaultStatus,
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
