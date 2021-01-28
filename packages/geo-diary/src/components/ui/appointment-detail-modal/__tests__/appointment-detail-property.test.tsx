import React from 'react'
import { shallow } from 'enzyme'
import AppointmentDetailProperty, { VendorSection, LandlordSection } from '../appointment-detail-property'
import { LoginMode } from '../appointment-detail-modal'

import { propertyData, vendorData, landlordData } from '../__stubs__/appointment-property'

describe('appointment-detail-property', () => {
  describe('AppointmentDetailProperty', () => {
    jest.mock('swr', () =>
      jest.fn(() => ({
        data: propertyData,
      })),
    )
    const mockProps = {
      propertyId: 'propertyId',
      loginMode: 'WEB' as LoginMode,
      isMobileView: false,
    }
    it('should match snapshot', () => {
      const wrapper = shallow(<AppointmentDetailProperty {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('VendorSection ', () => {
    jest.mock('swr', () =>
      jest.fn(() => ({
        data: vendorData,
      })),
    )
    const mockProps = {
      vendorId: 'vendorId',
      loginMode: 'WEB' as LoginMode,
      isMobileView: false,
    }
    it('should match snapshot', () => {
      const wrapper = shallow(<VendorSection {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('LandlordSection', () => {
    jest.mock('swr', () =>
      jest.fn(() => ({
        data: landlordData,
      })),
    )
    const mockProps = {
      landlordId: 'landlordId',
      loginMode: 'WEB' as LoginMode,
      isMobileView: false,
    }
    it('should match snapshot', () => {
      const wrapper = shallow(<LandlordSection {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
