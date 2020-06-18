import { generateBase64FromCanvas } from './utils'

// ImageCropper's handlers
export const drawCanvasAfterCrop = ({ completedCrop, previewCanvasRef, imgRef }) => () => {
  if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
    return
  }

  const image = imgRef.current
  const canvas = previewCanvasRef.current
  const crop = completedCrop

  const originWidth = image.naturalWidth
  const originHeight = image.naturalHeight

  const scaleX = originWidth / image.width
  const scaleY = originHeight / image.height

  const cropRatio = crop.width / crop.height

  let outputWidth
  let outputHeight

  // get width or height, based on ratio
  if (cropRatio > 1) {
    outputWidth = originWidth
    outputHeight = outputWidth / cropRatio
  } else {
    outputHeight = originHeight
    outputWidth = outputHeight * cropRatio
  }

  const ctx = canvas.getContext('2d')

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
    0,
    0,
    outputWidth,
    outputHeight,
  )
}

export const onLoadHandler = imgRef => img => {
  imgRef.current = img
}

export const onChangeHandler = setCrop => crop => setCrop(crop)

export const onCompleteHandler = setCompletedCrop => crop => setCompletedCrop(crop)

export const onCropClickHandler = ({ previewCanvasRef, completedCrop, onCropClick }) => () => {
  onCropClick({ previewCanvasRef, completedCrop })
}

// ImageCropperWithInput's handlers
export const onCloseHandler = ({ setVisible, setUpImg }) => () => {
  setUpImg('')
  setVisible(false)
}

export const onCropClick = ({ setCroppedImage, setVisible }) => ({ previewCanvasRef, completedCrop }) => {
  const base64Data = generateBase64FromCanvas(previewCanvasRef.current, completedCrop)
  setCroppedImage(base64Data)
  setVisible(false)
}
