import React from 'react'
import { render } from '../../../tests/react-testing'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import {
  AddressInformation,
  handleMoreThreeYear,
  mapStateToProps,
  mapDispatchToProps,
  AddressInput,
  renderYearOptions,
  renderSencondaryAddress,
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
    const wrapper = render(<AddressInformation {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('renderYearOptions', () => {
    it('should run correctly', () => {
      const result = renderYearOptions()
      expect(result).toHaveLength(101)
    })
  })

  describe('renderSencondaryAddress', () => {
    it('should match snapshot', () => {
      const wrapper = render(
        renderSencondaryAddress(contact.secondaryAddress, false, jest.fn(), { documentId: 'SOME_ID' }),
      )
      expect(wrapper).toMatchSnapshot()
    })
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
        addressType: 'primaryAddress' as 'primaryAddress' | 'secondaryAddress',
        documentImage: {
          documentId: 'https://someimage.com',
        },
      }
      const wrapper = render(<AddressInput {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
