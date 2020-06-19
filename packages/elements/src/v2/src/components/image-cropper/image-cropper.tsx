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
  onChangeUpImage,
} from './handlers'
import { generateDefaultCrop } from './utils'
import { passedFunctions } from './integration-helpers'
import { ImageCropperProps, ImageCropperWithInputProps, Crop, CompletedCrop } from './types'

export const renderChildrenWithProps = (children: React.ReactNode | undefined, props: { [key: string]: any }) => {
  if (!children) {
    return
  }
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props })
    }
    return child
  })
  return <div>{childrenWithProps}</div>
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  upImg,
  setUpImg,
  visible,
  setVisible,
  croppedImage,
  setCroppedImage,
  onClose,
  onCropClick,
  aspect,
  children,
}) => {
  const defaultCrop: Crop = generateDefaultCrop(aspect)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = React.useState<Crop>(defaultCrop)
  const [completedCrop, setCompletedCrop] = React.useState<CompletedCrop>(null)

  React.useEffect(drawCanvasAfterCrop({ completedCrop, previewCanvasRef, imgRef }), [completedCrop])

  // update crop when image change
  React.useEffect(onChangeUpImage({ crop: defaultCrop, setCrop }), [upImg])

  // if user cancels crop by clicking outside, this will be set to false
  const isImageCropped = Boolean(completedCrop?.width && completedCrop.height)

  return (
    <>
      {renderChildrenWithProps(children, {
        afterLoadedImage: passedFunctions.afterLoadedImage({ setUpImg, setVisible, setCroppedImage }),
        croppedImage,
      })}
      {visible && (
        <div className={cx(reactImageCropGlobalStyles, imageCropperOuter)}>
          <div className={imageCropperInner}>
            <div className={imageCropperContent}>
              <div className={imageCropperCropPanelWrapper}>
                <H5 isCentered>Crop Image</H5>
                <ReactCrop
                  ruleOfThirds
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
export const ImageCropperWithInput: React.FC<ImageCropperWithInputProps> = ({ aspect, ...inputProps }) => {
  const [upImg, setUpImg] = React.useState<string>('')
  const [visible, setVisible] = React.useState<boolean>(false)
  const [croppedImage, setCroppedImage] = React.useState<string>('')

  return (
    <ImageCropper
      aspect={aspect}
      setUpImg={setUpImg}
      upImg={upImg}
      visible={visible}
      setVisible={setVisible}
      onClose={onCloseHandler({ setVisible, setUpImg, setCroppedImage })}
      onCropClick={onCropClick({ setCroppedImage, setVisible })}
      croppedImage={croppedImage}
      setCroppedImage={setCroppedImage}
    >
      <ImageInput {...inputProps} />
    </ImageCropper>
  )
}

export * from './utils'
