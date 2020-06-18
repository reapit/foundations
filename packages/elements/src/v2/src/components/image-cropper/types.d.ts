import * as React from 'react'

export type ImageCropperProps = {
  upImg: string
  setUpImg: React.Dispatch<string>
  visible: boolean
  setVisible: React.Dispatch<boolean>
  onClose: () => any
  onCropClick: () => any
  croppedImage: string
  children: React.ReactNode
}

export type DrawCanvasAfterCropParams = {}
