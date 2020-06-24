import * as React from 'react'
import { isImageType, getTypeFromBase64 } from '@reapit/utils'

/**
 * To integrate with other components
 */
export const passedFunctions = {
  // when finish upload, set img src and show modal to crop image
  // <ImageInput /> integration
  afterLoadedImage: ({
    setUpImg,
    setVisible,
    setCroppedImage,
  }: {
    setUpImg: React.Dispatch<string>
    setVisible: React.Dispatch<boolean>
    setCroppedImage: React.Dispatch<string | null>
  }) => (base64: string) => {
    setUpImg(base64)
    setCroppedImage(base64)

    const fileType = getTypeFromBase64(base64)
    if (!isImageType(fileType)) {
      setVisible(false)
      return
    }
    setVisible(true)
  },
}
