import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell, DoubleClickPayLoad, SelectedMatrix } from './types'
import { getMaxRowAndCol } from './utils'

export const valueRenderer = (cell: Cell): string => cell.value

export const onDoubleClickCell = (payload: DoubleClickPayLoad, setSelected, onDoubleClickDefault) => (
  ...args
): boolean => {
  onDoubleClickDefault(...args)
  const { row, col, maxRowIndex, maxColIndex, isReadOnly } = payload
  const isFirstRow = row === 0
  const isFirstCol = col === 0
  if (isFirstCol && isFirstRow) {
    return false
  }
  if (isFirstCol && isReadOnly) {
    setSelected({
      start: { i: row, j: 0 },
      end: { i: row, j: maxColIndex }
    })
    return true
  }
  if (isFirstRow && isReadOnly) {
    setSelected({
      start: { i: 0, j: col },
      end: { i: maxRowIndex, j: col }
    })
    return true
  }
  return false
}

export const onSelectCells = setSelected => ({ start, end }: SelectedMatrix) => {
  setSelected({ start, end })
}

/* export const handleContextMenu: ReactDataSheet.ContextMenuHandler<Cell, string> = (e, cell, i, j) => {
  console.log('sad')
} */

/** all the customization of cell go here */
export const customCellRenderer = (data: Cell[][], setSelected) => (props: ReactDataSheet.CellRendererProps<Cell>) => {
  const { style, cell, onDoubleClick, ...restProps } = props
  const { validate = () => true, className = '', readOnly, selectComponent, ...restCell } = cell
  /* const isValid = validate(cell) */
  const [maxRowIndex, maxColIndex] = getMaxRowAndCol(data)
  const payload = {
    row: props.row,
    col: props.col,
    maxRowIndex,
    maxColIndex,
    isReadOnly: readOnly
  }
  return (
    <td
      {...restProps}
      {...restCell}
      className={`${props.className} ${className}`}
      style={style as React.CSSProperties}
      onDoubleClick={onDoubleClickCell(payload, setSelected, onDoubleClick)}
    >
      {props.children}
    </td>
  )
}

export const handleAddNewRow = (data: Cell[][], setData) => () => {
  const [maxRow] = getMaxRowAndCol(data)
  const lastRow = data[maxRow - 1]
  /* [
      { readOnly: true, value: '' },
      { value: 'A', readOnly: true },
      { value: 'B', readOnly: true },
      { value: 'C', readOnly: true },
      { value: 'D', readOnly: true }
    ] */
  /* return new row with same type of last row */
  const newEmptyRow = lastRow.map(e => ({ ...e, value: '' }))
  const newData = [...data, newEmptyRow]
  setData(newData)
}

export const handleCellsChanged = (prevData: Cell[][], setData /* setData from useState*/) => changes => {
  const newData = prevData.map(row => [...row])
  changes.forEach(({ row, col, value }) => {
    newData[row][col] = { ...newData[row][col], value }
  })
  setData(newData)
}
