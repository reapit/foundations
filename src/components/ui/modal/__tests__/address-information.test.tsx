import React from 'react'
import { shallow } from 'enzyme'
import { AddressInformation, renderForm, handleMoreThreeYear, renderExtraForm } from '../address-information'
import { contact } from '@/sagas/__stubs__/contact'

describe('AddressInformation', () => {
  it('should match snapshot', () => {
    const mockProps = {
      contact,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      loading: false
    }
    const wrapper = shallow(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderForm', () => {
    const mockProps = {
      address: contact.addresses,
      isShowMoreThreeYearInput: true,
      setShowMoreThreeYearInput: jest.fn(),
      loading: false,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn()
    }
    const fn = renderForm(mockProps)
    const component = fn()
    expect(component).toBeDefined()
  })

  it('handleMoreThreeYear', () => {
    const mockProps = {
      setShowMoreThreeYearInput: jest.fn(),
      isShowMoreThreeYearInput: true
    }
    const fn = handleMoreThreeYear(mockProps)
    fn()
    expect(mockProps.setShowMoreThreeYearInput).toBeCalledWith(!mockProps.isShowMoreThreeYearInput)
  })
  describe('renderExtraForm', () => {
    it('should match Snapshot', () => {
      const component = renderExtraForm(true)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return component', () => {
      const component = renderExtraForm(true)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('Input')).toHaveLength(1)
    })
    it('should return component', () => {
      const component = renderExtraForm(false)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('Input')).toHaveLength(0)
    })
  })
})
