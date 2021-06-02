import React from 'react'
import { shallow } from 'enzyme'
import {
  PwaMessageHandler,
  PwaMessagePoster,
  PwaNavigateContextProps,
  PwaNavigateProvider,
  usePwaNavigate,
} from '../pwa-navigate'
import { renderHook, act } from '@testing-library/react-hooks'

describe('PwaNavigateProvider', () => {
  it('should match snapshot', () => {
    expect(shallow(<PwaNavigateProvider />)).toMatchSnapshot()
  })
})

describe('usePwaNavigate', () => {
  it('should return pwaNavState and setPwaNavState', async () => {
    const { result } = renderHook<{}, PwaNavigateContextProps>(() => usePwaNavigate(), {
      wrapper: (props) => <PwaNavigateProvider>{props.children}</PwaNavigateProvider>,
    })
    const mockUrl = 'http://some-url.com'

    expect(result.current.pwaNavState).toBe(null)

    act(() => {
      result.current.setPwaNavState(mockUrl)
    })

    expect(result.current.pwaNavState).toBe(mockUrl)
  })
})

describe('PwaMessageHandler', () => {
  it('should match snapshot', () => {
    expect(shallow(<PwaMessageHandler setPwaNavState={jest.fn} pwaNavState="http://some-url" />)).toMatchSnapshot()
  })
})

describe('PwaMessagePoster', () => {
  it('should match snapshot', () => {
    expect(shallow(<PwaMessagePoster />)).toMatchSnapshot()
  })
})
