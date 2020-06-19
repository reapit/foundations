import {
  drawCanvasAfterCrop,
  onCloseHandler,
  onCropClick,
  onLoadHandler,
  onChangeHandler,
  onCompleteHandler,
  onCropClickHandler,
  onChangeUpImage,
} from '../handlers'
import { CompletedCrop } from '../types'
import { generateBase64FromCanvas } from '../utils'

jest.mock('../utils')

const setStateMock = jest.fn()

const completedCrop: CompletedCrop = {
  unit: 'px',
  width: 50,
  height: 50,
  x: 0,
  y: 0,
}
const drawImageMock = jest.fn()
const getContextMock = jest.fn(() => ({
  drawImage: drawImageMock,
}))

const previewCanvasRef = {
  current: {
    getContext: getContextMock,
  },
} as any

const imgRef = {
  current: {
    naturalWidth: 100,
    naturalHeight: 100,
    width: 100,
    height: 100,
  },
} as any

afterEach(() => {
  jest.clearAllMocks()
})

describe('drawCanvasAfterCrop', () => {
  it('should call functions with correct params', () => {
    const fn = drawCanvasAfterCrop({ completedCrop, previewCanvasRef, imgRef })
    fn()
    expect(getContextMock).toHaveBeenCalledWith('2d')
    expect(drawImageMock).toHaveBeenCalledWith(imgRef.current, 0, 0, 50, 50, 0, 0, 100, 100)
  })

  it('should return if falsy params', () => {
    const fn = drawCanvasAfterCrop({ completedCrop: null, previewCanvasRef, imgRef })
    const result = fn()
    expect(result).toBeUndefined()
  })
})

describe('onLoadHandle', () => {
  it('should be called and return undefined', () => {
    const fn = onLoadHandler(imgRef)
    const result = fn('base64')
    expect(result).toBeUndefined()
  })
})

describe('onChangeHandle', () => {
  it('should call setState correctly', () => {
    const fn = onChangeHandler(setStateMock)
    fn(completedCrop)
    expect(setStateMock).toHaveBeenCalledWith(completedCrop)
  })
})

describe('onCompleteHandler', () => {
  it('should call setState correctly', () => {
    const fn = onCompleteHandler(setStateMock)
    fn(completedCrop)
    expect(setStateMock).toHaveBeenCalledWith(completedCrop)
  })
})

describe('onCropClickHandler', () => {
  it('should call setState correctly', () => {
    const onCropClick = jest.fn()
    const fn = onCropClickHandler({ previewCanvasRef, completedCrop, onCropClick })
    fn()
    expect(onCropClick).toHaveBeenCalledWith({ previewCanvasRef, completedCrop })
  })
})

describe('onChangeUpImage', () => {
  it('should call setState correctly', () => {
    const fn = onChangeUpImage({ setCrop: setStateMock, crop: completedCrop })
    fn()
    expect(setStateMock).toHaveBeenCalledWith(completedCrop)
  })
})

describe('onCloseHandler', () => {
  it('should call setState correctly', () => {
    const setVisible = jest.fn()
    const setUpImg = jest.fn()
    const setCroppedImage = jest.fn()
    const fn = onCloseHandler({ setVisible, setUpImg, setCroppedImage })
    fn()
    expect(setUpImg).toHaveBeenCalledWith('')
    expect(setCroppedImage).toHaveBeenCalledWith('')
    expect(setVisible).toHaveBeenCalledWith(false)
  })
})

describe('onCropClick', () => {
  it('should call setState correctly', () => {
    const setVisible = jest.fn()
    const setCroppedImage = jest.fn()
    const fn = onCropClick({ setVisible, setCroppedImage })
    fn({ previewCanvasRef, completedCrop })
    expect(generateBase64FromCanvas).toHaveBeenCalledWith(previewCanvasRef.current, completedCrop)
    expect(setCroppedImage).toHaveBeenCalledWith(undefined)
    expect(setVisible).toHaveBeenCalledWith(false)
  })
})
