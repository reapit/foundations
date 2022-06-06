import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { Profile, mapStateToProps, mapDispatchToProps } from '../profile'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('profile', () => {
  describe('Profile', () => {
    const mockProps = {
      contact: contact,
      updateContact: jest.fn(),
      isSubmitting: false,
    }
    const wrapper = render(<Profile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
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
    it('should run correctly onNextHandler', () => {
      const mockDispatch = jest.fn()
      const { updateContact } = mapDispatchToProps(mockDispatch)
      updateContact({})
      expect(mockDispatch).toBeCalled()
    })
  })
})
