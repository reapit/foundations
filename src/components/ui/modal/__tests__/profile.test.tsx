import React from 'react'
import { shallow } from 'enzyme'
import Profile, { renderForm, filterCommunication, combineAdress, combineName } from '../profile'
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
  describe('filterCommunication', () => {
    it('should run correctly', () => {
      const expected = '01632 961556'
      const result = filterCommunication(contact.communications, 'Home')
      expect(result).toEqual(expected)
    })
    it('should return null', () => {
      const expected = null
      const result = filterCommunication(undefined, 'Home')
      expect(result).toEqual(expected)
    })
    it('should return null', () => {
      const expected = null
      const result = filterCommunication(undefined, 'test' as any)
      expect(result).toEqual(expected)
    })
  })
  describe('combineAddress', () => {
    it('should run correctly', () => {
      const result = combineAdress(contact.addresses)
      const expected = ' Tilbrook Farm Station Road Bow Brickhill Milton Keynes Buckinghamshire MK17 9JU'
      expect(result).toEqual(expected)
    })
  })
  describe('combineName', () => {
    it('should run correctly', () => {
      const result = combineName(contact)
      const expected = 'Ms Saoirse Chadwick'
      expect(result).toEqual(expected)
    })
  })
  describe('Profile', () => {
    const mockProps = {
      contact: contact,
      isSubmitting: false
    }
    const wrapper = shallow(<Profile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
