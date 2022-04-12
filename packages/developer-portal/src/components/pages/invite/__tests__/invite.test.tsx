import React from 'react'
import { render } from '../../../../tests/react-testing'
import Invite, { ModalFooter, ModalFooterProps, handleReject, handleSubmit } from '../invite'

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    expect(render(<Invite />)).toMatchSnapshot()
  })
})

describe('ModalFooter', () => {
  it('should match snapshot', () => {
    const props = {
      onConfirm: jest.fn(),
      onReject: jest.fn(),
      isLoading: false,
    } as ModalFooterProps
    expect(render(<ModalFooter {...props} />)).toMatchSnapshot()
  })
})

describe('handleReject', () => {
  it('should correctly submit', () => {
    const rejectInvite = jest.fn()
    const curried = handleReject(rejectInvite)
    curried()
    expect(rejectInvite).toHaveBeenCalledTimes(1)
  })
})

describe('handleSubmit', () => {
  it('should correctly submit', () => {
    const acceptInvite = jest.fn()
    const params = {
      name: 'name',
      jobTitle: 'CTO',
    }
    const curried = handleSubmit(acceptInvite)
    curried(params)
    expect(acceptInvite).toBeCalledWith(params)
  })
})
