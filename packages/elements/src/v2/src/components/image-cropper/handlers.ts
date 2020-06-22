import * as React from 'react'
import { generateBase64FromCanvas } from './utils'
import { CompletedCrop, OnCropClick, Crop, ResizeDimensions } from './types'

const DEFAULT_CANVAS_AXIS_COORDINATE = 0

// ImageCropper's handlers
export const drawCanvasAfterCrop = ({
  completedCrop: crop,
  previewCanvasRef,
  imgRef,
  resizeDimensions,
}: {
  completedCrop: CompletedCrop
  previewCanvasRef: React.RefObject<HTMLCanvasElement>
  imgRef: React.RefObject<HTMLImageElement>
  resizeDimensions?: ResizeDimensions
}) => () => {
  if (!crop || !previewCanvasRef.current || !imgRef.current) {
    return
  }

  const image = imgRef.current
  const canvas = previewCanvasRef.current

  const originWidth = image.naturalWidth
  const originHeight = image.naturalHeight

  const scaleX = originWidth / image.width
  const scaleY = originHeight / image.height

  const cropRatio = crop.width / crop.height

  let outputWidth
  let outputHeight
  // if not set resizeDimensions, calculate from original width & height
  if (!resizeDimensions) {
    // get width or height, based on ratio
    if (cropRatio > 1) {
      outputWidth = originWidth
      outputHeight = outputWidth / cropRatio
    } else {
      outputHeight = originHeight
      outputWidth = outputHeight * cropRatio
    }
  } else {
    // if set, take that
    outputWidth = resizeDimensions.width
    outputHeight = resizeDimensions.height
  }

  const ctx = canvas.getContext('2d')

  if (ctx === null) {
    return
  }

  // set real dimension when download, different from display dimension in preview
  // to retain high-quality image
  canvas.width = outputWidth
  canvas.height = outputHeight

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    DEFAULT_CANVAS_AXIS_COORDINATE,
    DEFAULT_CANVAS_AXIS_COORDINATE,
    outputWidth,
    outputHeight,
  )
}

export const onLoadHandler = (imgRef: React.RefObject<HTMLImageElement>) => img => {
  ;(imgRef as React.MutableRefObject<HTMLImageElement>).current = img
}

export const onChangeHandler = (setCrop: React.Dispatch<Crop>) => (crop: Crop) => setCrop(crop)

export const onCompleteHandler = (setCompletedCrop: React.Dispatch<CompletedCrop>) => (completedCrop: CompletedCrop) =>
  setCompletedCrop(completedCrop)

export const onCropClickHandler = ({
  previewCanvasRef,
  completedCrop,
  onCropClick,
}: {
  previewCanvasRef: React.RefObject<HTMLCanvasElement>
  completedCrop: CompletedCrop
  onCropClick: OnCropClick
}) => () => {
  onCropClick({ previewCanvasRef, completedCrop })
}

export const onChangeUpImage = ({ setCrop, crop }: { setCrop: React.Dispatch<Crop>; crop: Crop }) => () => {
  setCrop(crop)
}

// ImageCropperWithInput's handlers
export const onCloseHandler = ({
  setVisible,
  setUpImg,
  setCroppedImage,
}: {
  setVisible: React.Dispatch<boolean>
  setUpImg: React.Dispatch<string>
  setCroppedImage: React.Dispatch<string | null>
}) => () => {
  setUpImg('')
  setCroppedImage('')
  setVisible(false)
}

export const onCropClick = ({
  setCroppedImage,
  setVisible,
}: {
  setCroppedImage: React.Dispatch<string | null>
  setVisible: React.Dispatch<boolean>
}) => ({ previewCanvasRef, completedCrop }) => {
  const base64Data = generateBase64FromCanvas(previewCanvasRef.current, completedCrop)
  setCroppedImage(base64Data)
  setVisible(false)
}
