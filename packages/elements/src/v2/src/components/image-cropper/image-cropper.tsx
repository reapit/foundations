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
import { Button, H5, ImageInput } from '../../../../index'
import {
  drawCanvasAfterCrop,
  onLoadHandler,
  onCropClickHandler,
  onChangeHandler,
  onCompleteHandler,
  onCropClick,
  onCloseHandler,
} from './handlers'
import { passedFunctions } from './integration-helpers'
import { ImageCropperProps } from './types'

export const renderChildrenWithProps = (children, props) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props })
    }
    return child
  })
  return <>{childrenWithProps}</>
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  upImg,
  setUpImg,
  visible,
  setVisible,
  onClose,
  onCropClick,
  croppedImage,
  aspect,
  children,
}) => {
  const imgRef = React.useRef<HTMLElement>(null)
  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = React.useState<{ unit: string; width: number; aspect: number }>({
    unit: '%',
    width: 50,
    aspect,
  })
  const [completedCrop, setCompletedCrop] = React.useState<{ width: number; height: number } | null>(null)

  React.useEffect(drawCanvasAfterCrop({ completedCrop, previewCanvasRef, imgRef }), [completedCrop])

  // if user cancels crop by clicking outside, this will be set to false
  const isImageCropped = Boolean(completedCrop?.width && completedCrop.height)

  return (
    <>
      <>
        {renderChildrenWithProps(children, {
          afterLoadedImage: passedFunctions.afterLoadedImage({ setUpImg, setVisible }),
          croppedImage,
        })}
      </>
      {visible && (
        <div className={cx(reactImageCropGlobalStyles, imageCropperOuter)}>
          <div className={imageCropperInner}>
            <div className={imageCropperContent}>
              <div className={imageCropperCropPanelWrapper}>
                <H5 isCentered>Crop Image</H5>
                <ReactCrop
                  className={imageCropperCropPanel}
                  src={upImg}
                  onImageLoaded={onLoadHandler(imgRef)}
                  crop={crop}
                  onChange={onChangeHandler(setCrop)}
                  onComplete={onCompleteHandler(setCompletedCrop)}
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
                onClick={onCropClickHandler({ previewCanvasRef, completedCrop, onCropClick })}
              >
                Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Pre-integrated with <ImageInput />
 */
export const ImageCropperWithInput = () => {
  const [upImg, setUpImg] = React.useState<string>('')
  const [visible, setVisible] = React.useState<boolean>(false)
  const [croppedImage, setCroppedImage] = React.useState<string>('')

  return (
    <ImageCropper
      aspect={16 / 9}
      setUpImg={setUpImg}
      upImg={upImg}
      visible={visible}
      setVisible={setVisible}
      onClose={onCloseHandler({ setVisible, setUpImg })}
      onCropClick={onCropClick({ setCroppedImage, setVisible })}
      croppedImage={croppedImage}
    >
      <ImageInput name="imageInput" labelText="Image cropper" id="imageInput" allowClear />
    </ImageCropper>
  )
}

export * from './utils'
