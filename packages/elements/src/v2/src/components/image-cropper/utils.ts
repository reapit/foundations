import { CompletedCrop, Crop } from './types'

export const generateDefaultCrop = (aspect?: number): Crop => ({
  unit: '%',
  width: 50,
  height: aspect ? undefined : 50,
  aspect,
})

export const generateDownload = (canvas: HTMLCanvasElement, completedCrop: CompletedCrop) => {
  if (!completedCrop || !canvas) {
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

export const generateBase64FromCanvas = (canvas: HTMLCanvasElement, completedCrop: CompletedCrop): string => {
  if (!completedCrop || !canvas) {
    return ''
  }
  const base64Data = canvas.toDataURL('image/png')
  return base64Data
}
