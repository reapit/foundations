import React, { MouseEvent } from 'react'
import { render } from '../../../tests/react-testing'
import { UseNavState, NavStateProvider, useNavState } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'

describe('NavStateProvider', () => {
  it('should match snapshot', () => {
    expect(render(<NavStateProvider />)).toMatchSnapshot()
  })
})

describe('useNavState', () => {
  xit('should return pwaNavState and setPwaNavState', async () => {
    const { result } = renderHook<{}, UseNavState>(() => useNavState(), {
      wrapper: (props) => <NavStateProvider>{props.children}</NavStateProvider>,
    })

    const newState = {
      navItemIndex: 1,
      navMenuOpen: true,
      navSubMenuIndex: 1,
      navSubItemIndex: 1,
      callback: jest.fn(),
    }

    const event = ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown) as MouseEvent<HTMLAnchorElement>

    expect(result.current.navState).toEqual({
      navItemIndex: null,
      navMenuOpen: false,
      navSubMenuIndex: null,
      navSubItemIndex: null,
    })

    act(() => {
      result.current.setNavState(newState)(event)
    })

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(newState.callback).toHaveBeenCalledTimes(1)
    expect(result.current.navState).toEqual(newState)
  })
})
