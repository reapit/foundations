import { useSearchStore } from '../search-store'
import { renderHook, act } from '@testing-library/react-hooks'
import data from './mock-search-store.json'

describe('useSearchStore', () => {
  it('handles start fetching', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.err = new Error('error')
    })

    act(() => {
      result.current.setStartFetching()
    })

    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.err).toBeNull()
  }),


    it('handles fetch result', () => {
      const { result } = renderHook(() => useSearchStore())

      act(() => {
        result.current.isLoading = true
      })

      act(() => {
        result.current.setFetchResult(data, { a: {} }, 'demo', 'Rent')
      })

      expect(result.current.isLoading).toBeFalsy()
      expect(result.current.result).toEqual(data)
      expect(result.current.searchType).toBe('Rent')
      expect(result.current.searchKeyWord).toBe('demo')
    })

  it('handles fetch error', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.setStartFetching()
    })

    act(() => {
      result.current.setFetchError(new Error('bug'))
    })

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.err).toEqual(new Error('bug'))
  })

  it('handles getErrorString', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.setFetchError(new Error('bug'))
    })

    expect(result.current.getErrorString()).toBe('bug')
  })

  it('handles getErrorString', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.setFetchError(new Error('bug'))
    })

    expect(result.current.getErrorString()).toBe('bug')
  })

  it('handles getCountResult', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.setFetchResult(data, { a: {} }, 'demo', 'Rent')
    })

    expect(result.current.getCountResult()).toBe(10)
  })

  describe('handles getResultArr', () => {
    it('handles result null', () => {
      const { result } = renderHook(() => useSearchStore())
      expect(result.current.getResultArr()).toEqual([])
    })

    it('hanldes result not null', () => {
      const { result } = renderHook(() => useSearchStore())

      act(() => {
        result.current.setFetchResult(data, { a: {} }, 'demo', 'Rent')
      })

      expect(result.current.getResultArr()).toEqual(data.data)
    })
  })
})
