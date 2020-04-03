import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useUploadState, useUploadDispatch } from '../use-upload'
import { State, Dispatch, initialState } from '@/components/providers/upload-provider/reducers'
import UploadProvider from '@/components/providers/upload-provider/upload-provider'

describe('use-upload', () => {
  describe('useUploadState', () => {
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
