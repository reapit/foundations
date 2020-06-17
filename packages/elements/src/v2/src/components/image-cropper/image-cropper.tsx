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
import { generateDownload, drawCanvasAfterCrop, onLoadHandle } from './handlers'

export const ImageCropper = ({ upImg, visible, onClose }) => {
  const imgRef = React.useRef<HTMLElement>(null)
  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = React.useState<{ unit: string; width: number; aspect: number }>({
    unit: '%',
    width: 30,
    aspect: 16 / 9,
  })
  const [completedCrop, setCompletedCrop] = React.useState<{ width: number; height: number } | null>(null)

  React.useEffect(drawCanvasAfterCrop({ completedCrop, previewCanvasRef, imgRef }), [completedCrop])

  if (!visible) {
    return null
  }

  return (
    <div className={cx(reactImageCropGlobalStyles, imageCropperOuter)}>
      <div className={imageCropperInner}>
        <div className={imageCropperContent}>
          <div className={imageCropperCropPanelWrapper}>
            <H5 isCentered>Crop Image</H5>
            <ReactCrop
              className={imageCropperCropPanel}
              src={upImg}
              onImageLoaded={onLoadHandle(imgRef)}
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
          <Button type="button" variant="secondary" onClick={onClose}>
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
}
