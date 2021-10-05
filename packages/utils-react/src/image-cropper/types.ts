import * as React from 'react'

export interface FileInputTestProps {
  waitUntilDataReaderLoadResolver?: any
}

export interface FileInputProps {
  name: string
  labelText?: string
  id?: string
  dataTest?: string
  accept?: string
  allowClear?: boolean
  isNarrowWidth?: boolean
  // props specialized for unit test
  testProps?: FileInputTestProps
  inputProps?: Record<string, any>
  required?: boolean
  onFilenameClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  // to integrate with other components
  afterLoadedFile?: (base64: string, handleClearFile: () => void) => any
  croppedImage?: string | null
}

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
