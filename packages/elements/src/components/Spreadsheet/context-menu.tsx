import * as React from 'react'
import { ContextMenuData, SetContextMenuProp, Cell, SelectedMatrix, ContextMenuFCProps, OnCellsChanged } from './types'
import { hideContextMenu } from './handlers'

// clear means set value to empty string ""

export const clearRow = (data: Cell[][], currentRowIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldRow = [...data[currentRowIndex]]
  const newRowAfterClear = []
  const changedCells = []

  oldRow.forEach((cell, colIndex) => {
    const cellAfterClear = { ...oldRow[colIndex], value: '' }
    // the type of this must compatible with react-datasheet arrayOfChanges
    const changedCell = { cell: oldRow[colIndex], row: currentRowIndex, col: colIndex, value: cellAfterClear.value }
    newRowAfterClear.push(cellAfterClear)
    changedCells.push(changedCell)
  })

  // trigger onCellsChanged
  onCellsChanged(changedCells)
}

export const clearCol = (data: Cell[][], currentColIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldCol = data.map(row => row[currentColIndex])
  const newColAfterClear = []
  const changedCells = []

  oldCol.forEach((cell, rowIndex) => {
    const cellAfterClear = { ...oldCol[rowIndex], value: '' }
    // the type of this must compatible with react-datasheet arrayOfChanges
    const changedCell = { cell: oldCol[rowIndex], row: rowIndex, col: currentColIndex, value: cellAfterClear.value }
    newColAfterClear.push(cellAfterClear)
    changedCells.push(changedCell)
  })

  // trigger onCellsChanged
  onCellsChanged(changedCells)
}

// remove is completely remove the data from sheet
export const removeRow = (data: Cell[][], currentRowIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldRow = data[currentRowIndex]
  /* After remove, set value to null in changedCells so afterCellsChaned can detect that it was removed */
  const changedCells = oldRow.map((oldCell, colIndex) => ({
    cell: oldCell,
    row: currentRowIndex,
    col: colIndex,
    value: null,
  }))
  onCellsChanged(changedCells)
}

export const removeColSetData = (currentColIndex: number) => (prevData: Cell[][]): Cell[][] => {
  const newData = prevData.map(row => row.filter((cell, colIndex) => cell && colIndex !== currentColIndex))
  return newData
}
/** delegate event handler */
export const handleContextClick = (
  data: Cell[][],
  selected: SelectedMatrix | null,
  setContextMenuProp: SetContextMenuProp,
  onCellsChanged: OnCellsChanged,
) => event => {
  event.stopPropagation()
  const {
    start: { i: currentRowIndex, j: currentColIndex },
  } = selected as SelectedMatrix
  switch (event.target.id) {
    case 'clear-row':
      clearRow(data, currentRowIndex, onCellsChanged)
      setContextMenuProp()
      return 'clear-row'
    case 'clear-col':
      clearCol(data, currentColIndex, onCellsChanged)
      setContextMenuProp()
      return 'clear-col'
    case 'remove-row':
      removeRow(data, currentRowIndex, onCellsChanged)
      setContextMenuProp()
      return 'remove-row'
    case 'remove-col':
      setData(removeColSetData(currentColIndex))
      setContextMenuProp()
      return 'remove-col'
    default:
      return ''
  }
}

export const createMenu = (data: ContextMenuData[]): React.ReactNode => {
  return data.map(({ label, items }) => (
    <div key={label} className="wrap-section">
      <p className="menu-label">{label}</p>
      <ul className="menu-list">
        {items.map(({ id, text }) => (
          <li key={id}>
            <a id={id}>{text}</a>
          </li>
        ))}
      </ul>
    </div>
  ))
}

const dataMenu: ContextMenuData[] = [
  {
    label: 'Clear',
    items: [
      {
        id: 'clear-row',
        text: 'Clear row',
      },
      {
        id: 'clear-col',
        text: 'Clear column',
      },
    ],
  },
  {
    label: 'Remove',
    items: [
      {
        id: 'remove-row',
        text: 'Remove row',
      },
      {
        id: 'remove-col',
        text: 'Remove column',
      },
    ],
  },
]

export const ContextMenu: React.FC<ContextMenuFCProps> = ({
  data,
  selected,
  contextMenuProp: { visible, top, left },
  setContextMenuProp,
  onCellsChanged,
}) => {
  const visibleClass = visible ? 'spreadsheet-context-menu-visible' : 'spreadsheet-context-menu-hidden'
  return (
    <div
      style={{ top, left }}
      className={`spreadsheet-context-menu ${visibleClass}`}
      onClick={handleContextClick(data, selected, setContextMenuProp.bind(null, hideContextMenu), onCellsChanged)}
    >
      {createMenu(dataMenu)}
    </div>
  )
}
