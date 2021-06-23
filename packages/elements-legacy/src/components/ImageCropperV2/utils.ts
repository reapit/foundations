import { CompletedCrop, Crop, ResizeDimensions } from './types'

export const generateDefaultCrop = (aspect?: number): Crop => ({
  unit: '%',
  width: 50,
  // if aspect is set, dont need height, because we can calculate height from width + aspect
  // otherwise set initial height
  height: aspect ? undefined : 50,
  aspect,
})

export const generateDownload = (canvas: HTMLCanvasElement, completedCrop: CompletedCrop) => {
  if (!completedCrop || !canvas) {
    return
  }

  canvas.toBlob(
    (blob) => {
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

export const calculateOutputDimensions = ({
  cropRatio,
  resizeDimensions,
  originWidth,
  originHeight,
}: {
  cropRatio: number
  resizeDimensions?: ResizeDimensions
  originWidth: number
  originHeight: number
}): { outputWidth: number; outputHeight: number } => {
  const isWidthGreaterThanHeight = !resizeDimensions && cropRatio > 1
  const isHeightGreaterThanOrEqualWidth = !resizeDimensions && cropRatio <= 1

  // if not set resizeDimensions, calculate from original width & height
  if (isWidthGreaterThanHeight) {
    return {
      outputWidth: originWidth,
      outputHeight: originWidth / cropRatio,
    }
  }

  if (isHeightGreaterThanOrEqualWidth) {
    return {
      outputHeight: originHeight,
      outputWidth: originHeight * cropRatio,
    }
  }

  // if set, take that
  return {
    outputWidth: resizeDimensions?.width as number,
    outputHeight: resizeDimensions?.height as number,
  }
}
