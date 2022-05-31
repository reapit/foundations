import {
  onDoubleClickCell,
  valueRenderer,
  onSelectCells,
  handleAddNewRow,
  handleCellsChanged,
  handleOnChangeInput,
  handleClickUpload,
  handleContextMenu,
  handleAfterDataChanged,
  hideContextMenu,
  handleSetContextMenu,
  handleInitialDataChanged,
  setUploadDataCallback,
  handleCloseUploadModal,
  handleProcessValidRows,
} from '../handlers'
import {
  data,
  cellRenderProps,
  selectedMatrix,
  setData,
  setSelected,
  parseResult,
  setContextMenuProp,
  afterCellsChanged,
  setUploadData,
} from '../__stubs__'
import {
  getMaxRowAndCol,
  validatedDataGenerate,
  parseCsvFile,
  convertToCompatibleData,
  createDataWithInvalidRowsRemoved,
  generateDataWithReadOnlyAndIsValidated,
} from '../utils'
import { ValidateFunction } from '../types'

const onDoubleClickDefault = jest.fn()

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
      { value: 'row3@gmail.com' },
    ],
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
        'Email',
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
        'row2@gmail.com',
      ],
      ['New York', 'Building A', '11', '', '', 'City Z', '', 'AL7187', '017 7162 9121', '', 'row3@gmail.com'],
    ],
    errors: [],
    meta: { delimiter: ',', linebreak: '\r\n', aborted: false, truncated: false, cursor: 345 },
  }

  return {
    getMaxRowAndCol: jest.fn().mockReturnValue({ maxRow: data.length, maxCol: data[0].length }),
    parseCsvFile: jest.fn().mockResolvedValue(parseResult),
    convertToCompatibleData: jest.fn().mockReturnValue(data),
    convertDataToCsv: jest.fn().mockReturnValue(parseResult.data),
    unparseDataToCsvString: jest.fn().mockReturnValue('unparse data'),
    validatedDataGenerate: jest.fn().mockReturnValue('validated data'),
    changedCellsGenerate: jest.fn().mockReturnValue('changes'),
    createDataWithInvalidRowsRemoved: jest.fn().mockReturnValue([...data[0], ...data[1]]),
    generateDataWithReadOnlyAndIsValidated: jest.fn().mockReturnValue('generateDataWithReadOnlyAndIsValidated'),
  }
})

const validateMatrix = [
  [true, true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true, false],
  [true, true, true, true, true, true, true, true, true, true, false],
]

const validate = jest.fn(() => validateMatrix)

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
      isReadOnly: true,
    }
    const fn = onDoubleClickCell(payload, setSelected, onDoubleClickDefault)
    const result = fn(1, 2)
    expect(onDoubleClickDefault).toHaveBeenCalledWith(1, 2)
    expect(setSelected).toHaveBeenCalledWith({
      start: { i: 0, j: payload.col },
      end: {
        i: payload.maxRowIndex,
        j: payload.col,
      },
    })
    expect(result).toBe(true)
  })
  it('should not call setSelected when row !== 0, and return false', () => {
    const payload = {
      row: 2,
      col: 1,
      maxRowIndex: 3,
      maxColIndex: 4,
      isReadOnly: true,
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
      isReadOnly: false,
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

describe('handleAddNewRow', () => {
  it('should call setData with correct arg when columns in row have same length', () => {
    const mockAllowOnlyOneValidationErrorPerRow = true
    const fn = handleAddNewRow(data, setData, mockAllowOnlyOneValidationErrorPerRow, validate)
    fn()
    const expectedData = [...data]
    expectedData.push([
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
      { value: '', touched: false },
    ])
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith({
      data: expectedData,
      allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
      validateFunction: validate,
    })
    expect(setData).toHaveBeenCalledWith('generateDataWithReadOnlyAndIsValidated')
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
        { readOnly: true, value: 'Email' },
      ],
      [
        { readOnly: true, value: 'Office Name' },
        { readOnly: true, value: 'Building Name' },
        { readOnly: true, value: 'Building No.' },
        { readOnly: true, value: 'Address 1' },
        { readOnly: true, value: 'Address 2' },
        { readOnly: true, value: 'Address 3' },
      ],
    ]
    ;(getMaxRowAndCol as jest.Mocked<any>).mockImplementation(() => ({
      maxRow: dataNotEqualColLength.length,
      maxCol: dataNotEqualColLength[0].length,
    }))

    const mockAllowOnlyOneValidationErrorPerRow = true
    const fn = handleAddNewRow(dataNotEqualColLength, setData, mockAllowOnlyOneValidationErrorPerRow, validate)
    fn()
    const expectedData = [
      ...dataNotEqualColLength,
      [
        { readOnly: true, value: '', touched: false },
        { readOnly: true, value: '', touched: false },
        { readOnly: true, value: '', touched: false },
        { readOnly: true, value: '', touched: false },
        { readOnly: true, value: '', touched: false },
        { readOnly: true, value: '', touched: false },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
      ],
    ]
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith({
      data: expectedData,
      allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
      validateFunction: validate,
    })
    expect(setData).toHaveBeenCalledWith('generateDataWithReadOnlyAndIsValidated')
  })
})

describe('handleCellsChanged', () => {
  const data = [
    [{ value: 'Office name' }, { value: 'Building Name' }],
    [{ value: 'London2' }, { value: 'The Black House' }],
    [{ value: 'New York' }, { value: 'Building A' }],
  ]
  afterAll(() => {
    ;(validatedDataGenerate as jest.Mock).mockImplementation(() => 'validated data')
  })
  it('should return with underfined if changes length = 0', () => {
    const fn = handleCellsChanged(data, setData, true, validate, afterCellsChanged)
    const result = fn([])
    expect(result).toBeUndefined()
  })

  it('remove row case should work', () => {
    const changes = [
      { cell: { value: 'London2' }, row: 1, col: 0, value: null },
      {
        cell: { value: 'The Black House' },
        row: 1,
        col: 1,
        value: null,
      },
    ]
    const mockAllowOnlyOneValidationErrorPerRow = true
    const validateFn = jest.fn()
    const fn = handleCellsChanged(data, setData, mockAllowOnlyOneValidationErrorPerRow, validateFn, afterCellsChanged)
    fn(changes)
    const expectedNewData = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    const expectedChangedCells = [
      { oldCell: { value: 'London2' }, row: 1, col: 0, newCell: { value: null } },
      {
        oldCell: { value: 'The Black House' },
        row: 1,
        col: 1,
        newCell: { value: null },
      },
    ]
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedNewData,
        allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
      }),
    )
    expect(afterCellsChanged).toHaveBeenCalledWith(
      expectedChangedCells,
      'generateDataWithReadOnlyAndIsValidated',
      setData,
    )
    expect(setData).toHaveBeenCalledWith('generateDataWithReadOnlyAndIsValidated')
  })

  it('remove col case should work', () => {
    const changes = [
      { cell: { value: 'Building name' }, row: 0, col: 1, value: null },
      {
        cell: { value: 'The Black House' },
        row: 1,
        col: 1,
        value: null,
      },
      {
        cell: { value: 'Building A' },
        row: 2,
        col: 1,
        value: null,
      },
    ]
    const mockAllowOnlyOneValidationErrorPerRow = true
    const validateFn = () => {}
    const fn = handleCellsChanged(
      data,
      setData,
      mockAllowOnlyOneValidationErrorPerRow,
      (validateFn as unknown) as ValidateFunction,
      afterCellsChanged,
    )
    fn(changes)
    const expectedNewData = [[{ value: 'Office name' }], [{ value: 'London2' }], [{ value: 'New York' }]]
    const expectedChangedCells = [
      { oldCell: { value: 'Building Name' }, row: 0, col: 1, newCell: { value: null } },
      {
        oldCell: { value: 'The Black House' },
        row: 1,
        col: 1,
        newCell: { value: null },
      },
      {
        oldCell: { value: 'Building A' },
        row: 2,
        col: 1,
        newCell: { value: null },
      },
    ]
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedNewData,
        allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
      }),
    )
    expect(afterCellsChanged).toHaveBeenCalledWith(
      expectedChangedCells,
      'generateDataWithReadOnlyAndIsValidated',
      setData,
    )
    expect(setData).toHaveBeenCalledWith('generateDataWithReadOnlyAndIsValidated')
  })

  test('other cases should work', () => {
    const changes = [
      { cell: { value: 'Office name' }, row: 0, col: 0, value: '' },
      {
        cell: { value: 'London2' },
        row: 1,
        col: 0,
        value: '',
      },
    ]
    const mockAllowOnlyOneValidationErrorPerRow = true
    const fn = handleCellsChanged(data, setData, mockAllowOnlyOneValidationErrorPerRow, validate, afterCellsChanged)
    const newDataWithValidate = [
      [
        { value: '', isValidated: true },
        { value: 'Building Name', isValidated: true },
      ],
      [
        { value: '', isValidated: true },
        { value: 'The Black House', isValidated: true },
      ],
      [
        { value: 'New York', isValidated: true },
        { value: 'Building A', isValidated: true },
      ],
    ]
    ;(generateDataWithReadOnlyAndIsValidated as jest.Mock).mockImplementation(() => newDataWithValidate)
    fn(changes)
    const expectedNewData = [
      [{ value: '', touched: true }, { value: 'Building Name' }],
      [{ value: '', touched: true }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    const expectedChangedCells = [
      { oldCell: { value: 'Office name' }, row: 0, col: 0, newCell: { value: '', isValidated: true } },
      {
        oldCell: { value: 'London2' },
        row: 1,
        col: 0,
        newCell: { value: '', isValidated: true },
      },
    ]
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedNewData,
        allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
      }),
    )
    expect(afterCellsChanged).toHaveBeenCalledWith(expectedChangedCells, newDataWithValidate, setData)
    expect(setData).toHaveBeenCalledWith(newDataWithValidate)
  })
  it('should work with afterCellsChanged undefined', () => {
    const changes = [
      { cell: { value: 'Office name' }, row: 0, col: 0, value: '' },
      {
        cell: { value: 'London2' },
        row: 1,
        col: 0,
        value: '',
      },
    ]
    const mockAllowOnlyOneValidationErrorPerRow = true
    const fn = handleCellsChanged(data, setData, mockAllowOnlyOneValidationErrorPerRow, validate, undefined)
    const newDataWithValidate = [
      [
        { value: '', isValidated: true },
        { value: 'Building Name', isValidated: true },
      ],
      [
        { value: '', isValidated: true },
        { value: 'The Black House', isValidated: true },
      ],
      [
        { value: 'New York', isValidated: true },
        { value: 'Building A', isValidated: true },
      ],
    ]
    ;(generateDataWithReadOnlyAndIsValidated as jest.Mock).mockImplementation(() => newDataWithValidate)
    fn(changes)
    const expectedNewData = [
      [{ value: '', touched: true }, { value: 'Building Name' }],
      [{ value: '', touched: true }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]

    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith({
      data: expectedNewData,
      validateFunction: validate,
      allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
    })
    expect(setData).toHaveBeenCalledWith(newDataWithValidate)
  })
})

describe('handleOnChangeInput', () => {
  afterAll(() => {
    ;(createDataWithInvalidRowsRemoved as jest.Mocked<any>).mockReturnValue([...data[0], ...data[1]])
  })

  it('should return correctly when dont have validation function', async () => {
    const fn = handleOnChangeInput({ maxUploadRow: 1, setUploadData, validate: undefined })
    const eventMock: any = {
      target: {
        files: ['data'],
      },
    }
    const result = await fn(eventMock)
    expect(parseCsvFile).toHaveBeenCalledWith('data')
    expect(convertToCompatibleData).toHaveBeenCalledWith(parseResult)
    expect(setUploadData).toHaveBeenCalled()
    expect(result).toBe('not validated')
  })

  it('should return correctly when have validation function', async () => {
    const fn = handleOnChangeInput({ maxUploadRow: 3, setUploadData, validate })
    const eventMock: any = {
      target: {
        files: ['data'],
      },
    }
    const result = await fn(eventMock)
    expect(parseCsvFile).toHaveBeenCalledWith('data')
    expect(convertToCompatibleData).toHaveBeenCalledWith(parseResult)
    expect(validate).toHaveBeenCalledWith(data.slice(1, 4))
    expect(createDataWithInvalidRowsRemoved).toHaveBeenCalledWith(data.slice(1, 4), validateMatrix)
    expect(setUploadData).toHaveBeenCalled()
    expect(result).toBe('validated')
  })

  it('should return correctly when dont have target file', async () => {
    const fn = handleOnChangeInput({ maxUploadRow: 30, setUploadData, validate })
    const eventMock: any = {
      target: {
        files: null,
      },
    }
    const result = await fn(eventMock)
    expect(result).toBe(false)
  })

  it('should return correctly when error', async () => {
    ;(createDataWithInvalidRowsRemoved as jest.Mocked<any>).mockImplementation(() => {
      throw new Error('error1')
    })
    const fn = handleOnChangeInput({ maxUploadRow: 30, setUploadData, validate: () => [[true]] })
    const eventMock: any = {
      target: {
        files: ['data'],
      },
    }
    const result = await fn(eventMock)
    expect(setUploadData).toHaveBeenCalled()
    expect(result).toBe('error')
  })
})

describe('handleClickUpload', () => {
  it('should call click and return true', () => {
    const ref = {
      current: {
        click: jest.fn(),
        value: 'val',
      },
    } as any
    const spy = jest.spyOn(ref.current, 'click')
    const fn = handleClickUpload(ref)
    const result = fn()
    expect(spy).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  it('should not call click and return false without ref', () => {
    const ref = {
      current: null,
    } as any
    const fn = handleClickUpload(ref)
    const result = fn()
    expect(result).toBe(false)
  })
})

describe('handleContextMenu', () => {
  it('should call setContextMenuProp with correct value', () => {
    const mockEvent = { clientX: 10, clientY: 10, preventDefault: jest.fn() } as any
    const spy = jest.spyOn(mockEvent, 'preventDefault')
    const fn = handleContextMenu(setContextMenuProp)
    fn(mockEvent)
    expect(spy).toHaveBeenCalled()
    expect(setContextMenuProp).toHaveBeenCalledWith({ visible: true, left: 10, top: 10 })
  })
})

describe('handleAfterDataChanged', () => {
  it('should call afterDataChanged if it is a function', () => {
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
    ]
    const afterDataChanged = jest.fn()
    const fn = handleAfterDataChanged(data, data, afterDataChanged)
    fn()
    expect(afterDataChanged).toHaveBeenCalledWith('changes', data)
  })
  it('should not call afterDataChanged if it undefined', () => {
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
    ]
    const afterDataChanged = undefined
    const fn = handleAfterDataChanged(data, data, afterDataChanged as any)
    const result = fn()
    expect(result).toBeUndefined()
  })
})

describe('hideContextMenu', () => {
  it('should return ContextMenuProp with visible = false', () => {
    const mockState = { visible: true, top: 0, left: 0 }
    expect(hideContextMenu(mockState)).toEqual({
      visible: false,
      top: 0,
      left: 0,
    })
  })
})

describe('handleSetContextMenu', () => {
  it('should call addEventListener with correct argumen', () => {
    const setContextMenuPropMock = jest.fn()
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const fn = handleSetContextMenu(setContextMenuPropMock)
    fn()
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', setContextMenuPropMock)
  })
})

describe('handleInitialDataChanged', () => {
  /* eslint-disable-next-line max-len */
  it('should call generateDataWithReadOnlyAndIsValidated with correct arguments when allowOnlyOneValidationErrorPerRow', () => {
    const initialData = [[{ value: 'init' }]]
    const setDataMock = jest.fn()
    const validate = jest.fn()
    const mockAllowOnlyOneValidationErrorPerRow = true
    const fn = handleInitialDataChanged(initialData, setDataMock, mockAllowOnlyOneValidationErrorPerRow, validate)
    fn()
    expect(generateDataWithReadOnlyAndIsValidated).toHaveBeenCalledWith({
      data: initialData,
      validateFunction: validate,
      allowOnlyOneValidationErrorPerRow: mockAllowOnlyOneValidationErrorPerRow,
    })
  })
})

describe('handleCloseUploadModal', () => {
  it('should call setUploadData', () => {
    const fn = handleCloseUploadModal(setUploadData)
    fn()
    expect(setUploadData).toHaveBeenCalled()
  })
})

describe('handleProcessValidRows', () => {
  it('should call setUploadData', () => {
    const fn = handleProcessValidRows(setUploadData)
    fn()
    expect(setUploadData).toHaveBeenCalled()
  })
})

describe('setUploadDataCallback', () => {
  it('should return correct value', () => {
    const prevUploadData = {
      totalRow: 0,
      validatedData: [[]],
      invalidIndies: [],
      shouldProcess: false,
      isModalOpen: false,
      exceedMaxRow: false,
      header: [],
    }
    const partialData = {
      isModalOpen: true,
    }
    const fn = setUploadDataCallback(partialData)
    const result = fn(prevUploadData)
    expect(result).toEqual({ ...prevUploadData, isModalOpen: true })
  })
})
