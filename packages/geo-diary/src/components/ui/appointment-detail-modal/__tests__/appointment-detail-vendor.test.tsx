import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { shallow } from 'enzyme'
import AppointmentDetailVendor from '../appointment-detail-vendor'
import GET_VENDOR_BY_ID from '../get-vendor-by-id.graphql'
import { LoginMode } from '../appointment-detail-modal'
import { vendorQueryData } from '../__stubs__/vendor-query'

describe('AppointmentDetailVendor', () => {
  const mockProps = {
    vendorId: 'vendorId',
    loginMode: 'WEB' as LoginMode,
    isMobileView: false,
  }
  describe('AppointmentDetailVendor', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <AppointmentDetailVendor {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mocks = [
        {
          request: {
            query: GET_VENDOR_BY_ID,
            variables: {
              id: 'RPT200095',
            },
          },
          result: vendorQueryData,
        },
      ]
      const wrapper = shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AppointmentDetailVendor {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
