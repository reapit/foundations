import * as React from 'react'
import { Cell } from './types'

/** Get max row and col index */
export const getMaxRowAndCol = (data: Cell[][]) =>
  data.reduce(
    (acc, rowData) => {
      const lastMaxRow = acc[0]
      const lastMaxCol = acc[1]
      const newAcc = [lastMaxRow, lastMaxCol]
      if (lastMaxRow < data.length) {
        newAcc[0] = data.length
      }
      if (lastMaxCol < rowData.length) {
        newAcc[1] = rowData.length
      }
      return newAcc
    },
    [0 /* row */, 0 /* col */]
  )

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
