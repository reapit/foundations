import React from 'react'
import { shallow } from 'enzyme'
import { AMLProgressBar, calculateProgress } from '../aml-progressbar'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { LoginMode } from '@reapit/elements'
import { contact } from '@/sagas/__stubs__/contact'

describe('AMLProgressBar', () => {
  describe('AMLProgressBar', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact,
        status: sectionsStatus,
        id: 'AYL19000002',
        loginMode: 'WEB' as LoginMode,
        updateIdentityCheckStatus: jest.fn(),
        idCheck: {}
      }
      const wrapper = shallow(<AMLProgressBar {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('calculateProgress', () => {
    const result = calculateProgress(sectionsStatus)
    const expected = { percentage: 42, completed: 3, total: 7 }
    expect(result).toEqual(expected)
  })
})
