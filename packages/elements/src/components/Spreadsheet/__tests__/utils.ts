import { data, setData, parseResult } from '../__stubs__'
import {
  getMaxRowAndCol,
  setCurrentCellValue,
  parseCsvFile,
  unparseDataToCsvString,
  convertToCompatibleData,
  convertDataToCsv,
  changedCellsGenerate,
  validatedDataGenerate,
} from '../utils'
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
  it('should return 0 0 if undefined data', () => {
    expect(getMaxRowAndCol(undefined)).toEqual({ maxCol: 0, maxRow: 0 })
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

describe('changedCellsGenerate', () => {
  it('should return correct diff', () => {
    const newData = [[{ value: 'new1' }], [{ value: 'new2' }]]
    const oldData = [[{ value: 'old1' }], [{ value: 'old2' }]]
    const changedCells = changedCellsGenerate(newData, oldData)
    const expectedResult = [
      { oldCell: { value: 'old1' }, row: 0, col: 0, newCell: { value: 'new1' } },
      { oldCell: { value: 'old2' }, row: 1, col: 0, newCell: { value: 'new2' } },
    ]
    expect(changedCells).toEqual(expectedResult)
  })

  it('should return correct diff in delete row case', () => {
    const oldData = [[{ value: 'old1' }], [{ value: 'old2' }]]
    const newData = [[{ value: 'old1' }]]
    const changedCells = changedCellsGenerate(newData, oldData)
    const expectedResult = [{ oldCell: { value: 'old2' }, row: 1, col: 0, newCell: { value: null } }]
    expect(changedCells).toEqual(expectedResult)
  })

  it('should return correct diff in add row case', () => {
    const oldData = [[{ value: 'old1' }], [{ value: 'old2' }]]
    const newData = [[{ value: 'old1' }], [{ value: 'old2' }], [{ value: 'new' }]]
    const changedCells = changedCellsGenerate(newData, oldData)
    const expectedResult = [{ oldCell: { value: null }, row: 2, col: 0, newCell: { value: 'new' } }]
    expect(changedCells).toEqual(expectedResult)
  })

  it('should return correct diff in initial case', () => {
    const oldData = undefined
    const newData = [[{ value: 'new1' }, { value: 'new2' }], [{ value: 'new3' }]]
    const changedCells = changedCellsGenerate(newData, oldData)
    const expectedResult = [
      { oldCell: { value: null }, row: 0, col: 0, newCell: { value: 'new1' } },
      { oldCell: { value: null }, row: 0, col: 1, newCell: { value: 'new2' } },
      { oldCell: { value: null }, row: 1, col: 0, newCell: { value: 'new3' } },
    ]
    expect(changedCells).toEqual(expectedResult)
  })
  it('should return correct diff in delete all case', () => {
    const oldData = [[{ value: 'old1' }, { value: 'old2' }], [{ value: 'old3' }]]
    const newData = undefined
    const changedCells = changedCellsGenerate(newData, oldData)
    const expectedResult = [
      { oldCell: { value: 'old1' }, row: 0, col: 0, newCell: { value: null } },
      { oldCell: { value: 'old2' }, row: 0, col: 1, newCell: { value: null } },
      { oldCell: { value: 'old3' }, row: 1, col: 0, newCell: { value: null } },
    ]
    expect(changedCells).toEqual(expectedResult)
  })
})

describe('validatedDataGenerate', () => {
  it('should return with correct isValidated if validateFunction is function', () => {
    const validate = jest.fn().mockReturnValue([[true, false], [true]])
    const data = [[{ value: 'old1' }, { value: 'old2' }], [{ value: 'old3' }]]
    const expectedResult = [
      [
        { value: 'old1', isValidated: true },
        { value: 'old2', isValidated: false },
      ],
      [{ value: 'old3', isValidated: true }],
    ]
    const result = validatedDataGenerate(data, validate)
    expect(validate).toHaveBeenCalledWith(data)
    expect(result).toEqual(expectedResult)
  })

  it('should return with correct isValidated if validateFunction is undefined', () => {
    const validate = undefined
    const data = [[{ value: 'old1' }, { value: 'old2' }], [{ value: 'old3' }]]
    const expectedResult = [
      [
        { value: 'old1', isValidated: true },
        { value: 'old2', isValidated: true },
      ],
      [{ value: 'old3', isValidated: true }],
    ]
    const result = validatedDataGenerate(data, validate)
    expect(result).toEqual(expectedResult)
  })
})
