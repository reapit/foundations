import React from 'react'
import { shallow } from 'enzyme'
import { ConfirmContent, mapStateToProps, mapDispatchToProps } from '../confirm-content'
import { ReduxState } from '@/types/core'

describe('confirm-content', () => {
  it('it should match snapshot', () => {
    const mockProps = {
      handleCancel: jest.fn(),
      handleConfirm: jest.fn(),
      isSubmitting: false,
    }
    const wrapper = shallow(<ConfirmContent {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should match snapshot when isSubmitting equal to true', () => {
    const mockProps = {
      handleCancel: jest.fn(),
      handleConfirm: jest.fn(),
      isSubmitting: true,
    }
    const wrapper = shallow(<ConfirmContent {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const input = {
        appointmentDetail: {
          confirmModal: {
            isSubmitting: true,
          },
        },
      } as ReduxState
      const output = {
        isSubmitting: true,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })

    it('should run correctly when there is no appointmentDetail', () => {
      const input = {
        appointmentDetail: {},
      } as ReduxState
      const output = {
        isSubmitting: false,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })
  })
  describe('mapDispatchToProps', () => {
    it('handleCancel should run correctly', () => {
      const mockDispatch = jest.fn()
      const { handleCancel } = mapDispatchToProps(mockDispatch)
      handleCancel()
      expect(mockDispatch).toBeCalled()
    })
    it('handleConfirm should run correctly', () => {
      const mockDispatch = jest.fn()
      const { handleConfirm } = mapDispatchToProps(mockDispatch)
      handleConfirm()
      expect(mockDispatch).toBeCalled()
    })
  })
})
