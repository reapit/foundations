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
      onHandleSubmit: jest.fn(),
    }
    const wrapper = shallow(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when desktop mode', () => {
    const mockProps = {
      contact,
      isSubmitting: false,
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
    }
    const fn = renderForm(mockProps)
    const component = fn()
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
        auth: {
          refreshSession: {
            mode: 'DESKTOP',
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
      const { onHandleSubmit } = mapDispatchToProps(mockDispatch)
      onHandleSubmit({
        primaryAddress: contact.primaryAddress,
        secondaryAddress: contact.secondaryAddress,
        metadata: contact.metadata,
      })
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('AddressInput', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<AddressInput addressType="primaryAddress" />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
