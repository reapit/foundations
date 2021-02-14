import * as React from 'react'
import { UploadStateContext, UploadDispatchContext } from '@/context'

export function useUploadState() {
  const context = React.useContext(UploadStateContext)
  if (context === undefined) {
    throw new Error('useUploadState must be used within a UploadProvider')
  }
  return context
}

export function useUploadDispatch() {
  const context = React.useContext(UploadDispatchContext)
  if (context === undefined) {
    throw new Error('useUploadDispatch must be used within a UploadProvider')
  }
  return context
}
