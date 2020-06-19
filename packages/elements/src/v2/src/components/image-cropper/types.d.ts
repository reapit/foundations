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

export type ImageCropperProps = {
  upImg: string
  setUpImg: React.Dispatch<string>
  visible: boolean
  setVisible: React.Dispatch<boolean>
  croppedImage: string
  setCroppedImage: React.Dispatch<string>
  onClose: () => any
  onCropClick: OnCropClick
  aspect?: number
  children?: React.ReactNode
}

export type ImageCropperWithInputProps = FileInputProps & {
  aspect?: number
}

export type DrawCanvasAfterCropParams = {}
