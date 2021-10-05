import { generateDefaultCrop, generateDownload, generateBase64FromCanvas, calculateOutputDimensions } from '../utils'
import { CompletedCrop } from '../types'

const completedCrop: CompletedCrop = {
  unit: 'px',
  width: 50,
  height: 50,
  x: 0,
  y: 0,
}
const toBlob = jest.fn()
const toDataURL = jest.fn(() => 'data')

const previewCanvasRef = {
  current: {
    toBlob,
    toDataURL,
  },
} as any
describe('generateDefaultCrop', () => {
  it('should return correctly', () => {
    const result = generateDefaultCrop(10 / 5)
    expect(result).toEqual({
      unit: '%',
      width: 50,
      aspect: 10 / 5,
    })
  })

  it('should return correctly with undefined', () => {
    const result = generateDefaultCrop()
    expect(result).toEqual({
      unit: '%',
      width: 50,
      height: 50,
    })
  })
})

describe('generateDownload', () => {
  it('should call toBlob', () => {
    generateDownload(previewCanvasRef.current, completedCrop)
    expect(toBlob).toHaveBeenCalled()
  })

  it('should return correctly with undefined', () => {
    const result = generateDownload(previewCanvasRef.current, undefined as any)
    expect(result).toBeUndefined()
  })
})

describe('generateBase64FromCanvas', () => {
  it('should call toDataURL and return correctly', () => {
    const result = generateBase64FromCanvas(previewCanvasRef.current, completedCrop)
    expect(toDataURL).toHaveBeenCalledWith('image/png')
    expect(result).toBe('data')
  })

  it('should return correctly with undefined', () => {
    const result = generateBase64FromCanvas(previewCanvasRef.current, undefined as any)
    expect(result).toBe('')
  })
})

describe('calculateOutputDimensions', () => {
  it('should return correctly with defined resizeDimensions', () => {
    const result = calculateOutputDimensions({
      cropRatio: 2,
      resizeDimensions: { width: 100, height: 50 },
      originWidth: 200,
      originHeight: 100,
    })
    expect(result).toEqual({ outputWidth: 100, outputHeight: 50 })
  })

  it('should return correctly with undefined resizeDimensions', () => {
    const result1 = calculateOutputDimensions({
      cropRatio: 2,
      originWidth: 200,
      originHeight: 100,
    })
    expect(result1).toEqual({ outputWidth: 200, outputHeight: 100 })

    const result2 = calculateOutputDimensions({
      cropRatio: 0.5,
      originWidth: 100,
      originHeight: 200,
    })
    expect(result2).toEqual({ outputWidth: 100, outputHeight: 200 })
  })
})
