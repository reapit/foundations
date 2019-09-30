import React from 'react'
import { shallow } from 'enzyme'
import { ReportContainer, handleContent, handleTrigger, Report, mapStateToProps } from '../report'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('ReportContainer', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ReportContainer contact={contact} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handleContent', () => {
    const mockRef = {
      current: 'mockRef'
    }
    const fn = handleContent({ printRef: mockRef })
    const result = fn()
    expect(result).toEqual('mockRef')
  })

  it('handleTrigger', () => {
    const component = handleTrigger()
    const wrapper = shallow(<div>{component}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Report', () => {
    const wrapper = shallow(<Report />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {}
      })
    })
  })
})
