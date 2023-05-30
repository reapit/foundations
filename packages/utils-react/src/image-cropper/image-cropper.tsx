import React, {
  forwardRef,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  LegacyRef,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react'
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
} from './__styles__/styles'
import { cx } from '@linaria/core'
import {
  drawCanvasAfterCrop,
  onLoadHandler,
  onCropClickHandler,
  onChangeHandler,
  onCompleteHandler,
  onCropClick,
  onCloseHandler,
} from './handlers'
import { generateDefaultCrop } from './utils'
import { Crop, CompletedCrop, ImageCropperWithInputPropsWrapped } from './types'
import {
  Button,
  ButtonGroup,
  CreateImageUploadModel,
  ElFileInput,
  ElFileInputHidden,
  ElFileInputIconContainer,
  ElFileInputWrap,
  elMr4,
  FlexContainer,
  handleFileClear,
  handleFileView,
  handleSetNativeInput,
  Icon,
  ImageUploadModel,
  Label,
  SmallText,
  Subtitle,
} from '@reapit/elements'
import { v4 as uuid } from 'uuid'

export const handleFileChange =
  (setFileName: Dispatch<SetStateAction<string>>, setVisible: Dispatch<SetStateAction<boolean>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result

        if (base64 && typeof base64 === 'string') {
          setFileName(base64)
          setVisible(true)
        }
      }
      reader.onerror = (error) => {
        console.error(`file upload error: ${error}`)
      }
    }
  }

export const handleFileCrop =
  (
    setFileName: Dispatch<SetStateAction<string>>,
    croppedImage: string,
    onFileUpload?: (uploadImageModel: CreateImageUploadModel) => Promise<ImageUploadModel>,
  ) =>
  () => {
    const uploadFile = async () => {
      const value =
        onFileUpload &&
        croppedImage &&
        (await onFileUpload({
          imageData: croppedImage,
          name: uuid(),
        }))

      if (value && value.Url) {
        setFileName(value.Url)
      }
    }

    uploadFile().catch((error) => console.error(error))
  }

export const ImageCropperFileInput: ImageCropperWithInputPropsWrapped = forwardRef(
  (
    { onFileView, onFileUpload, defaultValue, label, placeholderText, accept, id, aspect, resizeDimensions, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [fileUrl, setFileName] = useState<string>(defaultValue ?? '')
    const [visible, setVisible] = useState<boolean>(false)
    const [croppedImage, setCroppedImage] = useState<string>('')
    const defaultCrop: Crop = generateDefaultCrop(aspect)
    const imgRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [crop, setCrop] = useState<Crop>(defaultCrop)
    const [completedCrop, setCompletedCrop] = useState<CompletedCrop>(null)

    const inputId = useMemo(() => {
      if (id) return id
      const randomId = uuid()
      const isTest = window?.process?.env?.NODE_ENV === 'test'
      return isTest ? 'test-static-id' : randomId
    }, [id])

    useEffect(drawCanvasAfterCrop({ completedCrop, previewCanvasRef, imgRef, resizeDimensions }), [completedCrop])

    useEffect(handleFileCrop(setFileName, croppedImage, onFileUpload), [croppedImage])

    useEffect(handleSetNativeInput(inputId, [fileUrl]), [fileUrl])

    const isImageCropped = Boolean(completedCrop?.width && completedCrop.height)

    return (
      <>
        <ElFileInputWrap>
          {label && <Label>{label}</Label>}
          <FlexContainer isFlexAlignCenter>
            <Button className={elMr4} type="button" intent="low">
              {fileUrl ? 'Change' : 'Upload'}
            </Button>
            <ElFileInput accept={accept} type="file" onChange={handleFileChange(setFileName, setVisible)} />
            <ElFileInputHidden
              id={inputId}
              {...rest}
              defaultValue={defaultValue}
              ref={ref as LegacyRef<HTMLInputElement>}
            />
            {fileUrl ? (
              <ElFileInputIconContainer>
                {onFileView && (
                  <Icon
                    onClick={handleFileView(onFileView, fileUrl)}
                    className={elMr4}
                    intent="primary"
                    icon="viewSolidSystem"
                  />
                )}
                <Icon
                  onClick={handleFileClear(setFileName)}
                  className={elMr4}
                  intent="primary"
                  icon="cancelSolidSystem"
                />
              </ElFileInputIconContainer>
            ) : (
              <SmallText hasGreyText hasNoMargin>
                {placeholderText ?? 'Upload File'}
              </SmallText>
            )}
          </FlexContainer>
        </ElFileInputWrap>
        {visible && (
          <div className={cx(reactImageCropGlobalStyles, imageCropperOuter)}>
            <div className={imageCropperInner}>
              <div className={imageCropperContent}>
                <div className={imageCropperCropPanelWrapper}>
                  <Subtitle>Crop Image</Subtitle>
                  <ReactCrop
                    ruleOfThirds
                    className={imageCropperCropPanel}
                    src={fileUrl}
                    onImageLoaded={onLoadHandler(imgRef)}
                    crop={crop}
                    onChange={onChangeHandler(setCrop)}
                    onComplete={onCompleteHandler(setCompletedCrop)}
                  />
                </div>
                <div className={imageCropperPreviewWrapper}>
                  <Subtitle>Preview</Subtitle>
                  {isImageCropped && <canvas ref={previewCanvasRef} className={imageCropperPreview} />}
                </div>
              </div>
              <ButtonGroup alignment="right">
                <Button
                  intent="low"
                  type="button"
                  onClick={onCloseHandler({ setVisible, setFileName, setCroppedImage })}
                >
                  Cancel
                </Button>
                <Button
                  intent="primary"
                  type="button"
                  disabled={!isImageCropped}
                  onClick={onCropClickHandler({
                    previewCanvasRef,
                    completedCrop,
                    onCropClick: onCropClick({ setCroppedImage, setVisible }),
                  })}
                >
                  Crop
                </Button>
              </ButtonGroup>
            </div>
          </div>
        )}
      </>
    )
  },
)
