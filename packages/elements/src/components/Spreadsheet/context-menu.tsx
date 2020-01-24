import * as React from 'react'
import { ContextMenuData, SetData, Cell, SelectedMatrix, ContextMenuFCProps } from './types'
import { hideContextMenu } from './utils'

export const clearRowSetData = (currentRowIndex: number) => (prevData: Cell[][]): Cell[][] => {
  const newData = prevData.map((row, rowIndex) => {
    /* Loop through row, check if row index = current selected row,
          if equal, clear that row value */
    return rowIndex === currentRowIndex ? row.map(cell => ({ ...cell, value: '' })) : row
  })
  return newData
}

export const clearColSetData = (currentColIndex: number) => (prevData: Cell[][]): Cell[][] => {
  const newData = prevData.map(row => {
    /* Loop through row, in each row, loop through cells, check if col index = current selected col
          if equal, clear that cell value */
    return row.map((cell, colIndex) => (colIndex === currentColIndex ? { ...cell, value: '' } : cell))
  })
  return newData
}

export const removeRowSetData = (currentRowIndex: number) => (prevData: Cell[][]): Cell[][] => {
  const newData = prevData.filter((row, rowIndex) => row && rowIndex !== currentRowIndex)
  return newData
}

export const removeColSetData = (currentColIndex: number) => (prevData: Cell[][]): Cell[][] => {
  const newData = prevData.map(row => row.filter((cell, colIndex) => cell && colIndex !== currentColIndex))
  return newData
}
/** delegate event handler */
export const handleContextClick = (selected: SelectedMatrix | null, setData: SetData, setContextMenuProp) => event => {
  event.stopPropagation()
  const {
    start: { i: currentRowIndex, j: currentColIndex }
  } = selected as SelectedMatrix
  switch (event.target.id) {
    case 'clear-row':
      setData(clearRowSetData(currentRowIndex))
      setContextMenuProp()
      return 'clear-row'
    case 'clear-col':
      setData(clearColSetData(currentColIndex))
      setContextMenuProp()
      return 'clear-col'
    case 'remove-row':
      setData(removeRowSetData(currentRowIndex))
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
        text: 'Clear row'
      },
      {
        id: 'clear-col',
        text: 'Clear column'
      }
    ]
  },
  {
    label: 'Remove',
    items: [
      {
        id: 'remove-row',
        text: 'Remove row'
      },
      {
        id: 'remove-col',
        text: 'Remove column'
      }
    ]
  }
]

export const ContextMenu: React.FC<ContextMenuFCProps> = ({
  selected,
  contextMenuProp: { visible, top, left },
  setData,
  setContextMenuProp
}) => {
  const visibleClass = visible ? 'spreadsheet-context-menu-visible' : 'spreadsheet-context-menu-hidden'
  return (
    <div
      style={{ top, left }}
      className={`spreadsheet-context-menu ${visibleClass}`}
      onClick={handleContextClick(selected, setData, setContextMenuProp.bind(null, hideContextMenu))}
    >
      {createMenu(dataMenu)}
    </div>
  )
}
