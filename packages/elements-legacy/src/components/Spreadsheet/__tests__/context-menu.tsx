import * as React from 'react'
import { render } from '../../../tests/react-testing'
import {
  ContextMenu,
  handleContextClick,
  clearRow,
  clearCol,
  removeRow,
  removeCol,
  handleRenderMenuInsideViewPort,
} from '../context-menu'
import { selectedMatrix, setContextMenuProp, data } from '../__stubs__'
import { ContextMenuProp } from '../types'

const onCellsChanged = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

describe('ContextMenu', () => {
  it('should match snapshot with visible true', () => {
    expect(
      render(
        <ContextMenu
          data={data}
          selected={selectedMatrix}
          setContextMenuProp={setContextMenuProp}
          contextMenuProp={{ visible: true, top: 0, left: 0 }}
          onCellsChanged={onCellsChanged}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match snapshot with visible false', () => {
    expect(
      render(
        <ContextMenu
          data={data}
          selected={selectedMatrix}
          setContextMenuProp={setContextMenuProp}
          contextMenuProp={{ visible: false, top: 0, left: 0 }}
          onCellsChanged={onCellsChanged}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleContextClick', () => {
  const eventBase = {
    stopPropagation: jest.fn(),
    target: {
      id: '',
    },
  }

  const fn = handleContextClick(data, selectedMatrix, setContextMenuProp, onCellsChanged)

  it('should return correct value clear-row', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'clear-row',
      },
    }
    const result = fn(mockEvent)
    expect(result).toBe('clear-row')
  })

  it('should return correct value clear-col', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'clear-col',
      },
    }
    const result = fn(mockEvent)
    expect(result).toBe('clear-col')
  })

  it('should return correct value remove-row', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'remove-row',
      },
    }
    const result = fn(mockEvent)
    expect(result).toBe('remove-row')
  })
  it('should return correct value remove-col', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: 'remove-col',
      },
    }
    const result = fn(mockEvent)
    expect(result).toBe('remove-col')
  })

  it('should return correct value default case', () => {
    const mockEvent = {
      ...eventBase,
      target: {
        id: '',
      },
    }
    const result = fn(mockEvent)
    expect(result).toBe('')
  })
})

describe('handleRenderMenuInsideViewPort', () => {
  it('should run correctly', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 20 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 20 })
    const mockContextMenuProps: ContextMenuProp = {
      left: 100,
      top: 100,
      visible: true,
    }
    const mockSetContextMenuProp = jest.fn()
    const mockContextMenuElement = {
      getBoundingClientRect: () => ({ right: 50, bottom: 50 }),
    }
    const fn = handleRenderMenuInsideViewPort(mockSetContextMenuProp, mockContextMenuProps)
    fn(mockContextMenuElement as any)
    expect(mockSetContextMenuProp).toHaveBeenCalledWith({
      top: 100,
      left: 70,
      visible: true,
    })
    expect(mockSetContextMenuProp).toHaveBeenCalledWith({
      top: 70,
      left: 100,
      visible: true,
    })
  })
})

describe('clearRow', () => {
  it('should clear correct data', () => {
    const currentRowIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [{ value: 'London2' }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    clearRow(data, currentRowIndex, onCellsChanged)
    const expectedChangedCells = [
      { cell: { value: 'London2' }, row: currentRowIndex, col: 0, value: '' },
      {
        cell: { value: 'The Black House' },
        row: currentRowIndex,
        col: 1,
        value: '',
      },
    ]
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
  it('should not clear readOnly row', () => {
    const currentRowIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [
        { value: 'London2', readOnly: true },
        { value: 'The Black House', readOnly: true },
      ],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    clearRow(data, currentRowIndex, onCellsChanged)
    const expectedChangedCells = []
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
})

describe('clearCol', () => {
  it('should clear correct data', () => {
    const currentColIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [{ value: 'London2' }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    clearCol(data, currentColIndex, onCellsChanged)
    const expectedChangedCells = [
      { cell: { value: 'Building Name' }, row: 0, col: currentColIndex, value: '' },
      {
        cell: { value: 'The Black House' },
        row: 1,
        col: currentColIndex,
        value: '',
      },
      {
        cell: { value: 'Building A' },
        row: 2,
        col: currentColIndex,
        value: '',
      },
    ]
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
  it('should not clear readOnly col', () => {
    const currentColIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name', readOnly: true }],
      [{ value: 'London2' }, { value: 'The Black House', readOnly: true }],
      [{ value: 'New York' }, { value: 'Building A', readOnly: true }],
    ]
    clearCol(data, currentColIndex, onCellsChanged)
    const expectedChangedCells = []
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
})

describe('removeRow', () => {
  it('should remove correct data', () => {
    const currentRowIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [{ value: 'London2' }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    removeRow(data, currentRowIndex, onCellsChanged)
    const expectedChangedCells = [
      { cell: { value: 'London2' }, row: currentRowIndex, col: 0, value: null },
      {
        cell: { value: 'The Black House' },
        row: currentRowIndex,
        col: 1,
        value: null,
      },
    ]
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
  it('should not remove readOnly row', () => {
    const currentRowIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [
        { value: 'London2', readOnly: true },
        { value: 'The Black House', readOnly: true },
      ],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    removeRow(data, currentRowIndex, onCellsChanged)
    const expectedChangedCells = []
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
})

describe('removeCol', () => {
  it('should clear correct data', () => {
    const currentColIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name' }],
      [{ value: 'London2' }, { value: 'The Black House' }],
      [{ value: 'New York' }, { value: 'Building A' }],
    ]
    removeCol(data, currentColIndex, onCellsChanged)
    const expectedChangedCells = [
      { cell: { value: 'Building Name' }, row: 0, col: currentColIndex, value: null },
      {
        cell: { value: 'The Black House' },
        row: 1,
        col: currentColIndex,
        value: null,
      },
      {
        cell: { value: 'Building A' },
        row: 2,
        col: currentColIndex,
        value: null,
      },
    ]
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
  it('should not clear readOnly col', () => {
    const currentColIndex = 1
    const data = [
      [{ value: 'Office name' }, { value: 'Building Name', readOnly: true }],
      [{ value: 'London2' }, { value: 'The Black House', readOnly: true }],
      [{ value: 'New York' }, { value: 'Building A', readOnly: true }],
    ]
    removeCol(data, currentColIndex, onCellsChanged)
    const expectedChangedCells = []
    expect(onCellsChanged).toHaveBeenCalledWith(expectedChangedCells)
  })
})
