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
  calculateNumberOfInvalidRows,
  createDataWithInvalidRowsRemoved,
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

describe('calculateNumberOfInvalidRows', () => {
  it('should return correctly', () => {
    const invalidIndies = [
      { row: 1, col: 2, cell: { value: 'hi' } },
      { row: 2, col: 2, cell: { value: 'hi' } },
      { row: 1, col: 4, cell: { value: 'hi' } },
      { row: 1, col: 5, cell: { value: 'hi' } },
    ]
    const result = calculateNumberOfInvalidRows(invalidIndies)
    expect(result).toBe(2)
  })
})
describe('calculateNumberOfInvalidRows', () => {
  it('should return correctly', () => {
    const data = [
      [
        { value: 'Office name' },
        { value: 'Building Name' },
        { value: 'Building No.' },
        { value: 'Address 1' },
        { value: 'Address 2' },
        { value: 'Address 3' },
        { value: 'Address 4' },
        { value: 'Post Code' },
        { value: 'Telephone' },
        { value: 'Fax' },
        { value: 'Email' },
      ],
      [
        { value: 'London' },
        { value: 'The White House' },
        { value: '15' },
        { value: 'London 1' },
        { value: '' },
        { value: 'Londom 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '0845 0000' },
        { value: '' },
        { value: 'row1@gmail.com' },
      ],
      [
        { value: 'London2' },
        { value: 'The Black House' },
        { value: '11' },
        { value: 'Test Addres' },
        { value: '' },
        { value: 'Adress 3' },
        { value: '' },
        { value: 'EC12NH' },
        { value: '087 471 929' },
        { value: '' },
        { value: 'row2@gmail.com' },
      ],
    ]
    const validateMatrix = [
      [true, true, true, true, true, true, true, true, true, true, false],
      [true, true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true, true],
    ]
    const result = createDataWithInvalidRowsRemoved(data, validateMatrix)
    const expectedResult = {
      dataWithInvalidRowsRemoved: [
        [
          { value: 'London', isValidated: true },
          { value: 'The White House', isValidated: true },
          { value: '15', isValidated: true },
          { value: 'London 1', isValidated: true },
          { value: '', isValidated: true },
          { value: 'Londom 3', isValidated: true },
          { value: '', isValidated: true },
          { value: 'EC12NH', isValidated: true },
          { value: '0845 0000', isValidated: true },
          { value: '', isValidated: true },
          { value: 'row1@gmail.com', isValidated: true },
        ],
        [
          { value: 'London2', isValidated: true },
          { value: 'The Black House', isValidated: true },
          { value: '11', isValidated: true },
          { value: 'Test Addres', isValidated: true },
          { value: '', isValidated: true },
          { value: 'Adress 3', isValidated: true },
          { value: '', isValidated: true },
          { value: 'EC12NH', isValidated: true },
          { value: '087 471 929', isValidated: true },
          { value: '', isValidated: true },
          { value: 'row2@gmail.com', isValidated: true },
        ],
      ],
      invalidIndies: [{ row: 0, col: 10, cell: { value: 'Email', isValidated: false } }],
    }
    expect(result).toEqual(expectedResult)
  })
})
