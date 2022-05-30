import React from 'react'
import { render } from '../../../../tests/react-testing'
import { UpdateStatusSuccess, mapDispatchToProps } from '../update-status-success'
import { History } from 'history'

describe('UpdateStatusSuccess', () => {
  it('should match snapshot', () => {
    const mockProps = {
      hideModal: jest.fn(),
      history: {} as History,
    }
    const wrapper = render(<UpdateStatusSuccess {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('hideModal', () => {
      const mockDispatch = jest.fn()
      const { hideModal } = mapDispatchToProps(mockDispatch)
      hideModal()
      expect(mockDispatch).toBeCalled()
    })
  })
})
