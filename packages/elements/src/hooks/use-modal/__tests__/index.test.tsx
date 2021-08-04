import React from 'react'
import { shallow } from 'enzyme'
import { useModal, UseModal } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useModal', () => {
  it('should return UseModal type correctly', async () => {
    const { result } = renderHook<{}, UseModal>(() => useModal('some-div'))

    expect(shallow(<result.current.Modal />)).toMatchSnapshot()

    act(() => {
      result.current.openModal()
    })

    expect(result.current.modalIsOpen).toBe(true)

    act(() => {
      result.current.closeModal()
    })

    expect(result.current.modalIsOpen).toBe(false)
  })
})
