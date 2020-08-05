import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useUploadState, useUploadDispatch } from '../use-upload'
import { State, Dispatch, initialState } from '@/reducers/update-provider'
import UploadProvider from '@/components/providers/upload-provider'

describe('use-upload', () => {
  describe('useUploadState', () => {
    it('should not return UploadStateContext if not use together with UploadProvider', () => {
      const wrapper = ({ children }) => <div>{children}</div>
      const { result } = renderHook<{}, State>(() => useUploadState(), { wrapper: wrapper as React.ComponentType })
      expect(result.current).toEqual({})
    })
    it('should return UploadStateContext', () => {
      const wrapper = ({ children }) => <UploadProvider>{children}</UploadProvider>
      const { result } = renderHook<{}, State>(() => useUploadState(), { wrapper: wrapper as React.ComponentType })
      expect(result.current).toEqual(initialState)
    })
    it('should return useUploadDispatch', () => {
      const wrapper = ({ children }) => <UploadProvider>{children}</UploadProvider>
      const { result } = renderHook<{}, Dispatch>(() => useUploadDispatch(), {
        wrapper: wrapper as React.ComponentType,
      })
      expect(result.current).toBeInstanceOf(Function)
    })
  })
})
