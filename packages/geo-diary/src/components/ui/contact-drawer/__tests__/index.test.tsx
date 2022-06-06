import React from 'react'
import { render } from '../../../../tests/react-testing'
import ContactDrawer, { handleClose } from '../index'

import { useAppState } from '../../../../core/app-state'

const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('ContactDrawer', () => {
  it('should match snapshot with default state', () => {
    expect(render(<ContactDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with drawer open and ATTENDEE type', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        contactDrawerOpen: true,
        contactDrawerType: 'ATTENDEE',
      },
      setAppState: jest.fn(),
    }))

    expect(render(<ContactDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with drawer open and PROPERTY type', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        contactDrawerOpen: true,
        contactDrawerType: 'PROPERTY',
      },
      setAppState: jest.fn(),
    }))

    expect(render(<ContactDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with drawer open and VENDOR type', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        contactDrawerOpen: true,
        contactDrawerType: 'VENDOR',
      },
      setAppState: jest.fn(),
    }))

    expect(render(<ContactDrawer />)).toMatchSnapshot()
  })

  it('should handle close', () => {
    const mockSetState = jest.fn()
    const curried = handleClose(mockSetState)
    curried()

    const newState = mockSetState.mock.calls[0][0]()

    expect(newState).toEqual({
      contactDrawerOpen: false,
    })
  })
})
