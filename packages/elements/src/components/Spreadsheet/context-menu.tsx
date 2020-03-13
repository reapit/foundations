import * as React from 'react'
import { ContextMenuData, SetContextMenuProp, Cell, SelectedMatrix, ContextMenuFCProps, OnCellsChanged } from './types'
import { hideContextMenu } from './handlers'

// clear means set value to empty string ""
export const clearRow = (data: Cell[][], currentRowIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldRow = data[currentRowIndex]
  const changedCells = oldRow
    .map((oldCell, colIndex) => ({
      cell: oldRow[colIndex],
      row: currentRowIndex,
      col: colIndex,
      value: '',
    }))
    .filter(({ cell: { readOnly } }) => !readOnly)
  // trigger onCellsChanged
  onCellsChanged(changedCells)
}

export const clearCol = (data: Cell[][], currentColIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldCol = data.map(row => row[currentColIndex])
  const changedCells = oldCol
    .map((cell, rowIndex) => ({
      cell: oldCol[rowIndex],
      row: rowIndex,
      col: currentColIndex,
      value: '',
    }))
    .filter(({ cell: { readOnly } }) => !readOnly)

  // trigger onCellsChanged
  onCellsChanged(changedCells)
}

// remove is completely remove the data from sheet
export const removeRow = (data: Cell[][], currentRowIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldRow = data[currentRowIndex]
  /* After remove, set value to null in changedCells so afterCellsChaned can detect that it was removed */
  const changedCells = oldRow
    .map((oldCell, colIndex) => ({
      cell: oldCell,
      row: currentRowIndex,
      col: colIndex,
      value: null,
    }))
    .filter(({ cell: { readOnly } }) => !readOnly)
  onCellsChanged(changedCells)
}

export const removeCol = (data: Cell[][], currentColIndex: number, onCellsChanged: OnCellsChanged) => {
  const oldCol = data.map(row => row[currentColIndex])
  const changedCells = oldCol
    .map((cell, rowIndex) => ({
      cell: oldCol[rowIndex],
      row: rowIndex,
      col: currentColIndex,
      value: null,
    }))
    .filter(({ cell: { readOnly } }) => !readOnly)
  // trigger onCellsChanged
  onCellsChanged(changedCells)
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
      setContextMenuProp(hideContextMenu)
      return 'clear-row'
    case 'clear-col':
      clearCol(data, currentColIndex, onCellsChanged)
      setContextMenuProp(hideContextMenu)
      return 'clear-col'
    case 'remove-row':
      removeRow(data, currentRowIndex, onCellsChanged)
      setContextMenuProp(hideContextMenu)
      return 'remove-row'
    case 'remove-col':
      removeCol(data, currentColIndex, onCellsChanged)
      setContextMenuProp(hideContextMenu)
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
      // temporary disable
      // {
      //   id: 'clear-col',
      //   text: 'Clear column',
      // },
    ],
  },
  {
    label: 'Remove',
    items: [
      {
        id: 'remove-row',
        text: 'Remove row',
      },
      // temporary disable
      // {
      //   id: 'remove-col',
      //   text: 'Remove column',
      // },
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
      onClick={handleContextClick(data, selected, setContextMenuProp, onCellsChanged)}
    >
      {createMenu(dataMenu)}
    </div>
  )
}
