import * as React from 'react'
import { Cell } from './types'

/** Get max row and col of data */
export const getMaxRowAndCol = (data: Cell[][]) => {
  const maxRow = data.length
  /* default to 0 */
  let maxCol = 0
  /* check every row to find max length of column */
  data.forEach(row => {
    const numberOfCurrentRowColumn = row.length
    if (maxCol < numberOfCurrentRowColumn) {
      maxCol = numberOfCurrentRowColumn
    }
  })
  return [maxRow, maxCol]
}

export const setCurrentCellValue = (
  cellData: string,
  data: Cell[][],
  row: number,
  col: number,
  setData: React.Dispatch<Cell[][]>
): void => {
  const newData = [...data]
  newData[row][col].value = cellData
  setData(newData)
}
