import { passedFunctions } from '../integration-helpers'

describe('passedFunctions', () => {
  it('should call setState correctly', () => {
    const setVisible = jest.fn()
    const setCroppedImage = jest.fn()
    const setUpImg = jest.fn()
    const base64 = 'base64'
    const fn = passedFunctions.afterLoadedImage({ setUpImg, setCroppedImage, setVisible })
    fn(base64)
    expect(setUpImg).toHaveBeenCalledWith(base64)
    expect(setCroppedImage).toHaveBeenCalledWith(base64)
    expect(setVisible).toHaveBeenCalledWith(true)
  })
})
