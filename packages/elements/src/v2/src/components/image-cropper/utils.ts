export const generateDownload = (canvas, crop) => {
  if (!crop || !canvas) {
    return
  }

  canvas.toBlob(
    blob => {
      const url = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropped.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(url)
    },
    'image/png',
    1,
  )
}

export const generateBase64FromCanvas = (canvas, crop) => {
  if (!crop || !canvas) {
    return
  }
  const base64Data = canvas.toDataURL('image/png')
  return base64Data
}
