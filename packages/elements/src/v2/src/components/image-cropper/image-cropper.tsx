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
import { drawCanvasAfterCrop, onLoadHandle, onCropClickHandle, onChangeHandle, onCompleteHandle } from './handlers'

export const ImageCropper = ({ upImg, visible, onClose, onCropClick }) => {
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
  // if user cancel crop by clicking outside, this will be set to false
  const isImageCropped = completedCrop?.width && completedCrop.height

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
              onChange={onChangeHandle(setCrop)}
              onComplete={onCompleteHandle(setCompletedCrop)}
            />
          </div>
          <div className={imageCropperPreviewWrapper}>
            <H5 isCentered>Preview</H5>
            {isImageCropped && <canvas ref={previewCanvasRef} className={imageCropperPreview} />}
          </div>
        </div>
        <div className={imageCropperActionWrapper}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!isImageCropped}
            onClick={onCropClickHandle({ previewCanvasRef, completedCrop, onCropClick })}
          >
            Crop
          </Button>
        </div>
      </div>
    </div>
  )
}

export * from './utils'
