/**
 * To integrate with other components
 */
export const passedFunctions = {
  // when finish upload, set img src and show modal to crop image
  // <ImageInput /> integration
  afterLoadedImage: ({ setUpImg, setVisible }) => base64 => {
    setUpImg(base64)
    setVisible(true)
  },
}
