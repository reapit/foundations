import { data, setData } from '../__stubs__'
import { getMaxRowAndCol, setCurrentCellValue } from '../utils'
import { Cell } from '../types'

afterEach(() => {
  jest.resetAllMocks()
})

describe('getMaxRowAndCol', () => {
  it('should return correct value with same-length rows and columns', () => {
    const result = getMaxRowAndCol(data)
    expect(result).toEqual({ maxRow: data.length, maxCol: data[0].length })
  })
  it('should return correct value with different-length col', () => {
    const newData = [...data]
    newData.push([{ value: 'val' }])

    const result = getMaxRowAndCol(newData)
    expect(result).toEqual({ maxRow: newData.length, maxCol: data[0].length })
  })
})

describe('setCurrentCellValue', () => {
  it('should call setData with correct arg', () => {
    setCurrentCellValue('cell value', data, 2, 3, setData)
    const newData = [...data]
    newData[2][3].value = 'cell value'
    expect(setData).toHaveBeenCalledWith(newData)
  })
})
