import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import {
  onDoubleClickCell,
  valueRenderer,
  onSelectCells,
  customCellRenderer,
  handleAddNewRow,
  handleCellsChanged
} from '../handlers'
import { data, cellRenderProps, selectedMatrix, setData, setSelected } from '../__stubs__'

const onDoubleClickDefault = jest.fn()

afterEach(() => {
  jest.resetAllMocks()
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
})

describe('handleAddNewRow', () => {
  it('should call setData with correct arg', () => {
    const getMaxRowAndCol = jest.fn(data => [data.length, data[0].length])
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
