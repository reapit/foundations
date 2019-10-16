import React from 'react'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import {
  AddressInformation,
  renderForm,
  handleMoreThreeYear,
  renderExtraForm,
  mapStateToProps,
  mapDispatchToProps,
  AddressInput
} from '../address-information'

describe('AddressInformation', () => {
  it('should match snapshot', () => {
    const mockProps = {
      contact,
      isSubmitting: false,
      onHandleSubmit: jest.fn(),
      isDesktopMode: false
    }
    const wrapper = shallow(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when desktop mode', () => {
    const mockProps = {
      contact,
      isSubmitting: false,
      onHandleSubmit: jest.fn(),
      isDesktopMode: true
    }
    const wrapper = shallow(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderForm', () => {
    const mockProps = {
      addresses: contact.addresses,
      isShowMoreThreeYearInput: true,
      setShowMoreThreeYearInput: jest.fn(),
      isSubmitting: false,
      isDesktopMode: false
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
      const mockProps = {
        isShowMoreThreeYearInput: true,
        values: contact.addresses[0],
        index: 0,
        setFieldValue: jest.fn(),
        isDesktopMode: false
      }
      const component = renderExtraForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return component', () => {
      const mockProps = {
        isShowMoreThreeYearInput: true,
        values: contact.addresses[0],
        index: 0,
        setFieldValue: jest.fn(),
        isDesktopMode: false
      }
      const component = renderExtraForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('[data-test="address-input"]')).toHaveLength(1)
    })
    it('should not return component', () => {
      const mockProps = {
        isShowMoreThreeYearInput: false,
        values: contact.addresses[0],
        index: 0,
        setFieldValue: jest.fn(),
        isDesktopMode: false
      }
      const component = renderExtraForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('[data-test="address-input"]')).toHaveLength(0)
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: false,
          checklistDetailData: {
            contact
          }
        },
        auth: {
          refreshSession: {
            mode: 'DESKTOP'
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact,
        isSubmitting: false,
        isDesktopMode: true
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {},
        isSubmitting: false,
        isDesktopMode: false
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onHandleSubmit } = mapDispatchToProps(mockDispatch)
      onHandleSubmit(contact.addresses)
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('AddressInput', () => {
    it('should render correctly', () => {
      const mockProps = {
        index: 0,
        isDesktopMode: false
      }
      const wrapper = shallow(<AddressInput {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
