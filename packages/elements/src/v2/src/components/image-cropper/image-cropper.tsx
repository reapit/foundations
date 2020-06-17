import * as React from 'react'
import ReactCrop from 'react-image-crop'
import {
  reactImageCropGlobalStyles,
  imageCropperOuter,
  imageCropperInner,
  imageCropperContent,
  imageCropperCropPanelWrapper,
  imageCropperCropPanel,
  imageCropperPreviewWrapper,
  imageCropperPreview,
  imageCropperActionWrapper,
} from './__styles__/styles'
import { cx } from 'linaria'
import { Button, H5 } from '../../../../index'

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the imageCropperPreview size.
export const getResizedCanvas = (canvas, newWidth, newHeight) => {
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = newWidth
  tmpCanvas.height = newHeight

  const ctx = tmpCanvas.getContext('2d')
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight)

  return tmpCanvas
}

export const generateDownload = (previewCanvas, crop) => {
  if (!crop || !previewCanvas) {
    return
  }

  const dpr = window.devicePixelRatio || 1
  const canvas = dpr !== 1 ? getResizedCanvas(previewCanvas, crop.width, crop.height) : previewCanvas

  canvas.toBlob(
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

export const ImageCropper = ({ upImg, visible }) => {
  const imgRef = React.useRef<HTMLElement>(null)
  const previewCanvasRef = React.useRef(null)
  const [crop, setCrop] = React.useState({ unit: '%', width: 30, aspect: 16 / 9 })
  const [completedCrop, setCompletedCrop] = React.useState(null)

  const onLoad = React.useCallback(img => {
    imgRef.current = img
  }, [])

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop
    const dpr = window.devicePixelRatio || 1

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * dpr
    canvas.height = crop.height * dpr

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * dpr,
      crop.height * dpr,
    )
  }, [completedCrop])

  return (
    visible && (
      <div className={cx(reactImageCropGlobalStyles, imageCropperOuter)} style={{ display: visible ? 'flex' : 'none' }}>
        <div className={imageCropperInner}>
          <div className={imageCropperContent}>
            <div className={imageCropperCropPanelWrapper}>
              <H5 isCentered>Crop Image</H5>
              <ReactCrop
                className={imageCropperCropPanel}
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
              />
            </div>
            <div className={imageCropperPreviewWrapper}>
              <H5 isCentered>Preview</H5>
              <canvas ref={previewCanvasRef} className={imageCropperPreview} />
            </div>
          </div>
          <div className={imageCropperActionWrapper}>
            <Button type="button" variant="secondary" onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
            >
              Download cropped image
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
