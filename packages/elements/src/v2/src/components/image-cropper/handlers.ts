export const generateDownload = (previewCanvas, crop) => {
  if (!crop || !previewCanvas) {
    return
  }

  previewCanvas.toBlob(
    blob => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}

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

  // set real dimension when download, different from display dimension
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

export const onLoadHandle = imgRef => img => {
  imgRef.current = img
}
