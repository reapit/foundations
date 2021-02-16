import React from 'react'
import { shallow } from 'enzyme'
import Profile, { renderForm, combineAdress, combineName } from '../personal-details'
import { contact } from '@/sagas/__stubs__/contact'

describe('profile', () => {
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const component = renderForm()
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const component = renderForm()
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('combineAddress', () => {
    it('should run correctly', () => {
      const result = combineAdress(contact.primaryAddress)
      const expected = '1 123 Harcourt Close Leighton Buzzard Bedfordshire 123123 LU7 2ST'
      expect(result).toEqual(expected)
    })
  })
  describe('combineName', () => {
    it('should run correctly', () => {
      const result = combineName(contact)
      const expected = 'Mr Carson Philip'
      expect(result).toEqual(expected)
    })
  })
  describe('Profile', () => {
    const mockProps = {
      contact: contact,
      isSubmitting: false,
    }
    const wrapper = shallow(<Profile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
