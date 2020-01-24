import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import {
  onDoubleClickCell,
  valueRenderer,
  onSelectCells,
  customCellRenderer,
  handleAddNewRow,
  handleCellsChanged,
  handleOnChangeInput,
  handleClickUpload,
  handleDownload,
  handleContextMenu
} from '../handlers'
import {
  data,
  cellRenderProps,
  selectedMatrix,
  setData,
  setSelected,
  parseResult,
  setContextMenuProp
} from '../__stubs__'
import {
  getMaxRowAndCol,
  parseCsvFile,
  convertToCompatibleData,
  convertDataToCsv,
  unparseDataToCsvString
} from '../utils'

const onDoubleClickDefault = jest.fn()

const validateUpload = jest.fn(data =>
  data.map(row =>
    row.map(cell => ({
      ...cell,
      validate: cell => Number.isInteger(Number(cell.value))
    }))
  )
)

jest.mock('../utils', () => {
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
      { value: 'Email' }
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
      { value: 'row1@gmail.com' }
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
      { value: 'row2@gmail.com' }
    ],
    [
      { value: 'New York' },
      { value: 'Building A' },
      { value: '11' },
      { value: '' },
      { value: '' },
      { value: 'City Z' },
      { value: '' },
      { value: 'AL7187' },
      { value: '017 7162 9121' },
      { value: '' },
      { value: 'row3@gmail.com' }
    ]
  ]
  const parseResult = {
    data: [
      [
        'Office name',
        'Building Name',
        'Building No.',
        'Address 1',
        'Address 2',
        'Address 3',
        'Address 4',
        'Post Code',
        'Telephone',
        'Fax',
        'Email'
      ],
      ['London', 'The White House', '15', 'London 1', '', 'Londom 3', '', 'EC12NH', '0845 0000', '', 'row1@gmail.com'],
      [
        'London2',
        'The Black House',
        '11',
        'Test Addres',
        '',
        'Adress 3',
        '',
        'EC12NH',
        '087 471 929',
        '',
        'row2@gmail.com'
      ],
      ['New York', 'Building A', '11', '', '', 'City Z', '', 'AL7187', '017 7162 9121', '', 'row3@gmail.com']
    ],
    errors: [],
    meta: { delimiter: ',', linebreak: '\r\n', aborted: false, truncated: false, cursor: 345 }
  }

  return {
    getMaxRowAndCol: jest.fn().mockReturnValue({ maxRow: data.length, maxCol: data[0].length }),
    parseCsvFile: jest.fn().mockResolvedValue(parseResult),
    convertToCompatibleData: jest.fn(() => parseResult.data),
    convertDataToCsv: jest.fn().mockReturnValue(parseResult.data),
    unparseDataToCsvString: jest.fn().mockReturnValue('unparse data')
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('valueRenderer', () => {
  it('should return value', () => {
    const result = valueRenderer(cellRenderProps.cell)
    expect(result).toBe(cellRenderProps.cell.value)
  })
})

describe('onDoubleClickCell', () => {
  it('should call setSelected if row = 0 and isReadOnly, and return true', () => {
    const payload = {
      row: 0,
      col: 1,
      maxRowIndex: 3,
      maxColIndex: 4,
      isReadOnly: true
    }
    const fn = onDoubleClickCell(payload, setSelected, onDoubleClickDefault)
    const result = fn(1, 2)
    expect(onDoubleClickDefault).toHaveBeenCalledWith(1, 2)
    expect(setSelected).toHaveBeenCalledWith({
      start: { i: 0, j: payload.col },
      end: {
        i: payload.maxRowIndex,
        j: payload.col
      }
    })
    expect(result).toBe(true)
  })
  it('should not call setSelected when row !== 0, and return false', () => {
    const payload = {
      row: 2,
      col: 1,
      maxRowIndex: 3,
      maxColIndex: 4,
      isReadOnly: true
    }
    const fn = onDoubleClickCell(payload, setSelected, onDoubleClickDefault)
    const result = fn(1, 2)
    expect(onDoubleClickDefault).toHaveBeenCalledWith(1, 2)
    expect(setSelected).not.toHaveBeenCalled()
    expect(result).toBe(false)
  })
  it('should not call setSelected when isReadOnly = false, and return false', () => {
    const payload = {
      row: 2,
      col: 1,
      maxRowIndex: 3,
      maxColIndex: 4,
      isReadOnly: false
    }
    const fn = onDoubleClickCell(payload, setSelected, onDoubleClickDefault)
    const result = fn(1, 2)
    expect(onDoubleClickDefault).toHaveBeenCalledWith(1, 2)
    expect(setSelected).not.toHaveBeenCalled()
    expect(result).toBe(false)
  })
})

describe('onSelectCell', () => {
  it('should call setSelected with right arg', () => {
    const fn = onSelectCells(setSelected)
    fn(selectedMatrix)
    expect(setSelected).toHaveBeenCalledWith(selectedMatrix)
  })
})

describe('customCellRenderer', () => {
  it('should match snapshot without CustomComponent', () => {
    const CellComponent = customCellRenderer(data, setData, setSelected)
    expect(shallow(<CellComponent {...cellRenderProps} />)).toMatchSnapshot()
  })
  it('should match snapshot with CustomComponent', () => {
    const cellRenderPropsCustomComponent = {
      ...cellRenderProps,
      cell: {
        ...cellRenderProps.cell,
        CustomComponent: () => <div>Custom Component</div>
      }
    }
    const CellComponent = customCellRenderer(data, setData, setSelected)
    expect(shallow(<CellComponent {...cellRenderPropsCustomComponent} />)).toMatchSnapshot()
  })

  it('should match snapshot with invalid cell', () => {
    const cellRenderPropsInvalid = {
      ...cellRenderProps,
      cell: { value: '11aa', validate: cell => Number.isInteger(Number(cell.value)) }
    }

    const CellComponent = customCellRenderer(data, setData, setSelected)
    expect(shallow(<CellComponent {...cellRenderPropsInvalid} />)).toMatchSnapshot()
  })
})

describe('handleAddNewRow', () => {
  it('should call setData with correct arg when columns in row have same length', () => {
    const fn = handleAddNewRow(data, setData)
    fn()
    const expectedResult = [...data]
    expectedResult.push([
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ])
    expect(setData).toHaveBeenCalledWith(expectedResult)
  })

  it('should call setData with correct arg when a random row have fewer column', () => {
    const dataNotEqualColLength = [
      [
        { readOnly: true, value: 'Office Name' },
        { readOnly: true, value: 'Building Name' },
        { readOnly: true, value: 'Building No.' },
        { readOnly: true, value: 'Address 1' },
        { readOnly: true, value: 'Address 2' },
        { readOnly: true, value: 'Address 3' },
        { readOnly: true, value: 'Address 4' },
        { readOnly: true, value: 'Post Code' },
        { readOnly: true, value: 'Telephone' },
        { readOnly: true, value: 'Fax' },
        { readOnly: true, value: 'Email' }
      ],
      [
        { readOnly: true, value: 'Office Name' },
        { readOnly: true, value: 'Building Name' },
        { readOnly: true, value: 'Building No.' },
        { readOnly: true, value: 'Address 1' },
        { readOnly: true, value: 'Address 2' },
        { readOnly: true, value: 'Address 3' }
      ]
    ]
    ;(getMaxRowAndCol as jest.Mocked<any>).mockImplementation(() => ({
      maxRow: dataNotEqualColLength.length,
      maxCol: dataNotEqualColLength[0].length
    }))

    const fn = handleAddNewRow(dataNotEqualColLength, setData)
    fn()
    const expectedResult = [
      ...dataNotEqualColLength,
      [
        { readOnly: true, value: '' },
        { readOnly: true, value: '' },
        { readOnly: true, value: '' },
        { readOnly: true, value: '' },
        { readOnly: true, value: '' },
        { readOnly: true, value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ]
    ]
    expect(setData).toHaveBeenCalledWith(expectedResult)
  })
})

describe('handleCellsChanged', () => {
  it('should call setData with correct arg', () => {
    const fn = handleCellsChanged(data, setData)

    const changes = [{ row: 1, col: 2, value: 'new' }]
    fn(changes)
    const expectResult = data.map(row => [...row])
    expectResult[1][2] = { ...expectResult[1][2], value: 'new' }
    expect(setData).toHaveBeenCalledWith(expectResult)
  })
})

describe('handleOnChangeInput', () => {
  it('should return with correct value when have validateUpload', async () => {
    const fn = handleOnChangeInput(validateUpload, setData)
    const eventMock: any = {
      target: {
        files: ['data']
      }
    }
    const returnData = await fn(eventMock)
    expect(returnData).toBe('validated')
  })
  it('should return with correct value when dont have validateUpload', async () => {
    const fn = handleOnChangeInput(undefined, setData)
    const eventMock: any = {
      target: {
        files: ['data']
      }
    }
    const returnData = await fn(eventMock)
    expect(returnData).toBe(true)
  })
  it('should return with correct value when dont have target', async () => {
    const fn = handleOnChangeInput(undefined, setData)
    const eventMock: any = {
      target: undefined
    }
    const returnData = await fn(eventMock)
    expect(returnData).toBe(false)
  })
})

describe('handleClickUpload', () => {
  it('should call click and return true', () => {
    const ref = {
      current: {
        click: jest.fn(),
        value: 'val'
      }
    } as any
    const spy = jest.spyOn(ref.current, 'click')
    const fn = handleClickUpload(ref)
    const result = fn()
    expect(spy).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  it('should not call click and return false without ref', () => {
    const ref = {
      current: null
    } as any
    const fn = handleClickUpload(ref)
    const result = fn()
    expect(result).toBe(false)
  })
})

describe('handleDownload', () => {
  it('should call convertDataToCsv & unparseDataToCsvString with correct arg and return true if window & document', () => {
    window.URL.createObjectURL = jest.fn()
    const fn = handleDownload(data, window, document)
    const result = fn()
    expect(convertDataToCsv).toHaveBeenCalledWith(data)
    expect(unparseDataToCsvString).toHaveBeenCalledWith(parseResult.data)
    expect(result).toBe(true)
  })
  it('should return false if window & document are undefined', () => {
    const fn = handleDownload(data, undefined, undefined)
    const result = fn()
    expect(result).toBe(false)
  })
})

describe('handleContextMenu', () => {
  it('should call setContextMenuProp with correct value', () => {
    const mockEvent = { clientX: 10, clientY: 10, preventDefault: jest.fn() } as any
    const spy = jest.spyOn(mockEvent, 'preventDefault')
    const fn = handleContextMenu(setContextMenuProp)
    const result = fn(mockEvent)
    expect(spy).toHaveBeenCalled()
    expect(setContextMenuProp).toHaveBeenCalledWith({ visible: true, left: 20, top: 10 })
  })
})
