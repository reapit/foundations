import { handleSetRef, handleSetState, useAsyncState } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'

describe('handleSetRef', () => {
  it('should set a ref if defined', () => {
    const mockPromise = jest.fn()
    const resolverRef = {
      current: mockPromise,
    }
    const state = {
      someKey: 'someValue',
    }

    const curried = handleSetRef(resolverRef, state)

    curried()

    expect(mockPromise).toHaveBeenCalledWith(state)
    expect(resolverRef.current).toBeUndefined()
  })
})

describe('handleSetState', () => {
  it('should set state then return a ref that is a promise resolver', () => {
    const mockPromise = jest.fn()
    const setState = jest.fn()
    const resolverRef = {
      current: mockPromise,
    }
    const state = {
      someKey: 'someValue',
    }

    const curried = handleSetState(setState, resolverRef)

    const returnedPromise = curried(state)

    resolverRef.current()

    expect(setState).toHaveBeenCalledWith(state)
    expect(returnedPromise instanceof Promise).toBe(true)
  })
})

describe('useAsyncState', () => {
  it('should return generic StateType', async () => {
    type StateType = [state: boolean, setState: (state: boolean) => Promise<boolean>]

    const { result } = renderHook<{}, StateType>(() => useAsyncState<boolean>(false))

    expect(result.current[0]).toEqual(false)

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toEqual(true)
  })
})
