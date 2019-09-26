import React from 'react'
import { shallow } from 'enzyme'
import {
  Profile,
  renderForm,
  filterCommunication,
  combineAdress,
  combineName,
  mapStateToProps,
  mapDispatchToProps
} from '../profile'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

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
      onNextHandler: jest.fn()
    }
    const wrapper = shallow(<Profile {...mockProps} />)
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
  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler()
      expect(mockDispatch).toBeCalled()
    })
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler()
      expect(mockDispatch).toBeCalled()
    })
  })
})
