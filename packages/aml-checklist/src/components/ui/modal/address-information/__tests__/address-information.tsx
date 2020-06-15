import React from 'react'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import {
  AddressInformation,
  renderForm,
  handleMoreThreeYear,
  mapStateToProps,
  mapDispatchToProps,
  AddressInput,
} from '../address-information'

describe('AddressInformation', () => {
  it('should match snapshot', () => {
    const mockProps = {
      contact,
      isSubmitting: false,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      onHandleSubmit: jest.fn(),
    }
    const wrapper = shallow(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderForm', () => {
    const mockProps = {
      primaryAddress: contact.primaryAddress,
      secondaryAddress: contact.secondaryAddress,
      isShowMoreThreeYearInput: true,
      setShowMoreThreeYearInput: jest.fn(),
      isSubmitting: false,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
    }
    const fn = renderForm(mockProps)
    const component = fn({ values: {} })
    expect(component).toBeDefined()
  })

  it('handleMoreThreeYear', () => {
    const mockProps = {
      setShowMoreThreeYearInput: jest.fn(),
      isShowMoreThreeYearInput: true,
    }
    const fn = handleMoreThreeYear(mockProps)
    fn()
    expect(mockProps.setShowMoreThreeYearInput).toBeCalledWith(!mockProps.isShowMoreThreeYearInput)
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: false,
          checklistDetailData: {
            contact,
          },
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact,
        isSubmitting: false,
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {},
        isSubmitting: false,
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler({})()
      expect(mockDispatch).toBeCalled()
    })
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onPrevHandler } = mapDispatchToProps(mockDispatch)
      onPrevHandler()
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('AddressInput', () => {
    it('should render correctly', () => {
      const mockProps = {
        index: 0,
        addressType: 'primaryAddress',
      }
      const wrapper = shallow(<AddressInput {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
