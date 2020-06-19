import * as React from 'react'
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
    setCroppedImage: React.Dispatch<string>
  }) => (base64: string) => {
    setUpImg(base64)
    setCroppedImage(base64)
    setVisible(true)
  },
}
