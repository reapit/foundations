import * as React from 'react'
import { FileInputProps } from '../../../../index'

export type CropBase = {
  width: number
  height: number
  unit: 'px' | '%'
  x: number
  y: number
}
export type Crop = Partial<CropBase> & {
  aspect?: number
}
export type CompletedCrop =
  | (Required<CropBase> & {
      aspect?: number
    })
  | null

export type OnCropClick = ({
  previewCanvasRef,
  completedCrop,
}: {
  previewCanvasRef: React.RefObject<HTMLCanvasElement>
  completedCrop: CompletedCrop
}) => any

export type ResizeDimensions = {
  width: number
  height: number
}

export type ImageCropperProps = {
  upImg: string
  setUpImg: React.Dispatch<string>
  visible: boolean
  setVisible: React.Dispatch<boolean>
  // null is first init
  croppedImage: string | null
  setCroppedImage: React.Dispatch<string | null>
  onClose: () => any
  onCropClick: OnCropClick
  children?: React.ReactNode
  aspect?: number
  resizeDimensions?: ResizeDimensions
}

export type ImageCropperWithInputProps = FileInputProps & {
  aspect?: number
  resizeDimensions?: ResizeDimensions
}

export type DrawCanvasAfterCropParams = {}
