import { data, setData, parseResult } from '../__stubs__'
import {
  getMaxRowAndCol,
  setCurrentCellValue,
  parseCsvFile,
  unparseDataToCsvString,
  convertToCompatibleData,
  convertDataToCsv,
  hideContextMenu
} from '../utils'
import { Cell } from '../types'
import fs from 'fs'
import path from 'path'

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
    const newData = data.map(row => row.map(cell => ({ ...cell })))
    newData[2][3].value = 'cell value'
    expect(setData).toHaveBeenCalledWith(newData)
  })
})

describe('parseCsvFile', () => {
  it('should resolve with correct result', async () => {
    const file = fs.readFileSync(path.resolve(__dirname, '../__stubs__/test.csv'), 'utf-8')
    const result = await parseCsvFile((file as unknown) as File)

    expect(result).toEqual(parseResult)
  })
})

describe('unparseDataToCsvString', () => {
  it('should return correct string', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '../__stubs__/test.csv'), 'utf-8')
    expect(unparseDataToCsvString(parseResult.data)).toEqual(file)
  })
})

describe('convertToCompatibleData', () => {
  it('should return correct result', () => {
    expect(convertToCompatibleData(parseResult)).toEqual(data)
  })
})

describe('convertDataToCsv', () => {
  it('should return correct result', () => {
    expect(convertDataToCsv(data)).toEqual(parseResult.data)
  })
})

describe('hideContextMenu', () => {
  it('should return ContextMenuProp with visible = false', () => {
    const mockState = { visible: true, top: 0, left: 0 }
    expect(hideContextMenu(mockState)).toEqual({
      visible: false,
      top: 0,
      left: 0
    })
  })
})
describe('hideContextMenu', () => {
  it('should return ContextMenuProp with visible = false', () => {
    const mockState = { visible: true, top: 0, left: 0 }
    expect(hideContextMenu(mockState)).toEqual({
      visible: false,
      top: 0,
      left: 0
    })
  })
})
